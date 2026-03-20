export default function ProgressBar({ progress, isProcessing }) {
  if (!isProcessing && progress === 0) return null;

  return (
    <div className="w-full bg-secondary rounded-full h-4 mt-6 overflow-hidden relative shadow-inner">
      <div 
        className="bg-primary h-4 rounded-full transition-all duration-300 ease-out flex items-center justify-end px-2"
        style={{ width: `${progress}%` }}
      >
        {progress > 10 && (
          <span className="text-[10px] text-primary-foreground font-bold">{progress}%</span>
        )}
      </div>
      
      {/* Animated shimmer effect when processing */}
      {isProcessing && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
      )}
    </div>
  );
}
