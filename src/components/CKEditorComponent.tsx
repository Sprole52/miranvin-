'use client'
import React from 'react';

interface CKEditorComponentProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
  height?: string;
  label?: string;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({
  value,
  onChange,
  placeholder = 'İçerik girin...',
  height = '300px',
  label
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div 
        className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500"
        style={{ height }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full p-3 border-0 focus:ring-0 focus:outline-none resize-none"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default CKEditorComponent;
