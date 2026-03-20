export default function PreviewPanel({ previewUrl, processedUrl, type }) {
  if (!previewUrl) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Before */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Original {"(With Metadata)"}</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden aspect-video flex items-center justify-center relative group">
          {type === 'image' ? (
            <img src={previewUrl} alt="Original" className="w-full h-full object-contain filter group-hover:brightness-75 transition-all" />
          ) : (
            <video src={previewUrl} className="w-full h-full object-contain" controls />
          )}
          {type === 'image' && (
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 pointer-events-none">
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">⚠️ UNCLEANED</span>
             </div>
          )}
        </div>
      </div>

      {/* After */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Sanitized {"(Safe)"}</h3>
        <div className="bg-card rounded-xl border-2 border-primary/20 overflow-hidden aspect-video flex items-center justify-center relative group">
          {!processedUrl ? (
            <div className="text-muted-foreground text-sm animate-pulse text-center p-4">
              Awaiting processing...<br/>
              <span className="text-xs">Your file will appear here.</span>
            </div>
          ) : type === 'image' ? (
            <img src={processedUrl} alt="Cleaned" className="w-full h-full object-contain" />
          ) : (
            <video src={processedUrl} className="w-full h-full object-contain" controls />
          )}
          {type === 'image' && processedUrl && (
             <div className="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-md border border-green-400">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                CLEANED
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
