import { useState, useRef } from 'react';
import { UploadCloud, FileType } from 'lucide-react';

export default function UploadBox({ onUpload, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`glass-panel border-2 border-dashed p-12 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer w-full shadow-2xl relative z-20 ${
        disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''
      } ${
        isDragging
          ? 'border-teal-500 bg-teal-500/10 scale-[1.03] shadow-[0_0_40px_rgba(10,58,58,0.5)]'
          : 'border-white/10 hover:border-teal-500/50 hover:bg-white/5 hover:-translate-y-1'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/*,video/*"
        disabled={disabled}
      />
      <div className="bg-secondary p-4 rounded-full mb-4">
        <UploadCloud className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">
        Click or drag file to this area to upload
      </h3>
      <p className="text-muted-foreground mb-4">
        Support for a single image (max 100MB) or video (max 1GB)
      </p>
      
      <div className="flex gap-2 text-sm text-muted-foreground items-center justify-center">
        <FileType className="w-4 h-4" />
        <span>JPG, PNG, WEBP, MP4, MOV, MKV</span>
      </div>
    </div>
  );
}
