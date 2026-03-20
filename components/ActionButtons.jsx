import { Download, Share2 } from 'lucide-react';

export default function ActionButtons({ fileUrl, fileName, disabled }) {
  if (!fileUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName || 'cleaned_file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName || 'cleaned_file', { type: blob.type });
        
        await navigator.share({
          title: 'Cleaned File via Data Peel',
          text: 'Here is my metadata-free file securely cleaned by Data Peel.',
          files: [file],
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 fade-in-up delay-500 w-full relative z-20">
      <button
        onClick={handleDownload}
        disabled={disabled}
        className="flex-1 bg-teal-900 hover:bg-teal-800 text-white font-medium py-4 px-6 rounded-2xl shadow-[0_4px_14px_0_rgba(10,58,58,0.39)] hover:shadow-[0_6px_20px_rgba(10,58,58,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95 text-lg border border-teal-700/50"
      >
        <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        Download Clean File
      </button>

      <button
        onClick={handleShare}
        disabled={disabled}
        className="flex-1 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-medium py-4 px-6 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group hover:-translate-y-1 active:scale-95 text-lg"
      >
        <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform opacity-70 group-hover:opacity-100" />
        Share via Device
      </button>
    </div>
  );
}
