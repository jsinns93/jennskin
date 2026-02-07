import React, { useRef, useState } from 'react';
import { api } from './api';

interface Props {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
}

const ImageUploader: React.FC<Props> = ({ currentUrl, onUpload, label = 'Image' }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      const result = await api.uploadImage(file);
      setPreview(result.url);
      onUpload(result.url);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="flex items-start gap-4">
        {preview && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={preview}
            onChange={e => { setPreview(e.target.value); onUpload(e.target.value); }}
            placeholder="Image URL or upload"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm"
          />
          <input type="file" ref={fileRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload from PC'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
