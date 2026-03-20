import { File, HardDrive, FileJson } from 'lucide-react';

export default function FileInfoCard({ file }) {
  if (!file) return null;

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4 relative z-20">
      <h3 className="text-lg font-medium text-white border-b border-white/10 pb-2">File Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <File className="w-5 h-5 text-teal-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <HardDrive className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Size</p>
            <p className="text-sm font-medium text-gray-200">{getFileSize(file.size)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <FileJson className="w-5 h-5 text-teal-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm text-gray-400">Type</p>
            <p className="text-sm font-medium text-gray-200 truncate">{file.type || 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
