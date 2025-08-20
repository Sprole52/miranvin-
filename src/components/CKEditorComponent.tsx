'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  const editorRef = useRef<unknown>(null);

  // Custom CKEditor configuration - Word benzeri basit editör
  const editorConfig = {
    placeholder: placeholder,
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'indent',
        'outdent',
        '|',
        'link',
        'blockQuote',
        'insertTable',
        '|',
        'undo',
        'redo'
      ]
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraf', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Başlık 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Başlık 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Başlık 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Başlık 4', class: 'ck-heading_heading4' }
      ] as any
    },
    fontSize: {
      options: [
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72
      ]
    },
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://'
    },
    removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    language: 'tr'
  };

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
        <CKEditor
          editor={ClassicEditor as any}
          config={editorConfig}
          data={value}
          onChange={(event: unknown, editor: unknown) => {
            const data = (editor as any).getData();
            onChange(data);
          }}
          onReady={(editor: unknown) => {
            editorRef.current = editor;
            // Editör hazır olduğunda placeholder'ı ayarla
            if (placeholder) {
              (editor as any).editing.view.document.on('focus', () => {
                if ((editor as any).getData() === '') {
                  (editor as any).setData(placeholder);
                }
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default CKEditorComponent;
