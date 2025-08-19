import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Query,
  CollectionReference
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  respondedAt?: string;
}

interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  updatedAt: string;
}

interface ContactState {
  messages: ContactMessage[];
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
  isSending: boolean;
  filters: {
    status: string | null;
    priority: string | null;
    isRead: boolean | null;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

const initialState: ContactState = {
  messages: [],
  contactInfo: null,
  isLoading: false,
  error: null,
  isSending: false,
  filters: {
    status: null,
    priority: null,
    isRead: null,
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
};

// Async thunks
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData: Omit<ContactMessage, 'id' | 'isRead' | 'isArchived' | 'status' | 'tags' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'contact_messages'), {
        ...messageData,
        isRead: false,
        isArchived: false,
        status: 'new',
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      const newMessage = { id: docRef.id, ...messageData } as ContactMessage;
      return newMessage;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchContactMessages = createAsyncThunk(
  'contact/fetchMessages',
  async ({ page = 1, limit = 20, filters = {} }: { page?: number; limit?: number; filters?: Partial<ContactState['filters']> }, { rejectWithValue }) => {
    try {
      let q: CollectionReference | Query = collection(db, 'contact_messages');
      
      // Apply filters
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      if (filters.priority) {
        q = query(q, where('priority', '==', filters.priority));
      }
      if (filters.isRead !== null) {
        q = query(q, where('isRead', '==', filters.isRead));
      }
      
      // Apply ordering and pagination
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactMessage[];
      
      return {
        messages,
        pagination: {
          page,
          limit,
          total: messages.length,
          hasMore: messages.length === limit,
        },
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateMessageStatus = createAsyncThunk(
  'contact/updateMessageStatus',
  async ({ id, updates }: { id: string; updates: Partial<ContactMessage> }, { rejectWithValue }) => {
    try {
      const messageRef = doc(db, 'contact_messages', id);
      await updateDoc(messageRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      
      return { id, updates };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteContactMessage = createAsyncThunk(
  'contact/deleteMessage',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchContactInfo = createAsyncThunk(
  'contact/fetchContactInfo',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contact_info'));
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as ContactInfo;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateContactInfo = createAsyncThunk(
  'contact/updateContactInfo',
  async (contactInfo: Partial<ContactInfo>, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contact_info'));
      let docRef;
      
      if (querySnapshot.empty) {
        // Create new document if none exists
        const newDoc = await addDoc(collection(db, 'contact_info'), {
          ...contactInfo,
          updatedAt: new Date().toISOString(),
        });
        docRef = newDoc;
      } else {
        // Update existing document
        docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          ...contactInfo,
          updatedAt: new Date().toISOString(),
        });
      }
      
      const updatedDoc = await getDocs(collection(db, 'contact_info'));
      const docData = updatedDoc.docs.find(d => d.id === docRef.id);
      return { id: docRef.id, ...docData?.data() } as ContactInfo;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ContactState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    resetPagination: (state) => {
      state.pagination = {
        page: 1,
        limit: 20,
        total: 0,
        hasMore: true,
      };
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find(msg => msg.id === action.payload);
      if (message) {
        message.isRead = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Send message
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.isSending = false;
        // Admin panelindeyse mesajları güncelle
        state.messages.unshift(action.payload as ContactMessage);
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
      });

    // Fetch messages
    builder
      .addCase(fetchContactMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { messages, pagination } = action.payload;
        
        if (pagination.page === 1) {
          state.messages = messages;
        } else {
          state.messages = [...state.messages, ...messages];
        }
        
        state.pagination = pagination;
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update message status
    builder
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const message = state.messages.find(msg => msg.id === id);
        if (message) {
          Object.assign(message, updates);
        }
      });

    // Delete message
    builder
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(msg => msg.id !== action.payload);
      });

    // Fetch contact info
    builder
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload;
      });

    // Update contact info
    builder
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload as ContactInfo;
      });
  },
});

export const { setFilters, clearError, resetPagination, markAsRead } = contactSlice.actions;
export default contactSlice.reducer;
