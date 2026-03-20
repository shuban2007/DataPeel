import { ShieldCheck, MapPin, Camera, Clock, Laptop } from 'lucide-react';

export default function MetadataPanel({ metadata }) {
  if (!metadata) return null;

  const hasSensitiveData = Object.keys(metadata).length > 0 && !metadata.note;

  if (metadata.note) {
    return (
      <div className="glass-panel p-6 rounded-2xl border-l-[6px] border-l-teal-600 shadow-xl relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          Detected Metadata
        </h3>
        <p className="text-gray-400">{metadata.note}</p>
      </div>
    );
  }

  if (!hasSensitiveData) {
    return (
      <div className="glass-panel p-6 rounded-2xl border-l-[6px] border-l-teal-500 shadow-xl relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-teal-500" />
          Detected Metadata
        </h3>
        <p className="text-gray-300 font-medium">No sensitive metadata detected in this file.</p>
        <p className="text-sm text-gray-400 mt-1">You're already safe, but processing will guarantee a clean slate.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border-l-[6px] border-l-red-900/80 shadow-xl relative z-20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-red-400">⚠️</span> Sensitive Metadata Detected
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metadata.Latitude && metadata.Longitude && (
          <div className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5 fade-in-up delay-100">
            <div className="p-2 bg-red-900/30 rounded-lg shrink-0 border border-red-900/50">
               <MapPin className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">Location (GPS)</p>
              <p className="text-xs text-gray-400 mt-0.5">{metadata.Latitude.toFixed(4)}, {metadata.Longitude.toFixed(4)}</p>
            </div>
          </div>
        )}

        {(metadata.Make || metadata.Model) && (
          <div className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5 fade-in-up delay-200">
            <div className="p-2 bg-blue-900/30 rounded-lg shrink-0 border border-blue-900/50">
               <Camera className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">Device / Camera</p>
              <p className="text-xs text-gray-400 mt-0.5">{metadata.Make} {metadata.Model}</p>
            </div>
          </div>
        )}

        {metadata.DateTimeOriginal && (
          <div className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5 fade-in-up delay-300">
            <div className="p-2 bg-yellow-900/30 rounded-lg shrink-0 border border-yellow-900/50">
               <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">Date / Time</p>
              <p className="text-xs text-gray-400 mt-0.5">{new Date(metadata.DateTimeOriginal).toLocaleString()}</p>
            </div>
          </div>
        )}

        {metadata.Software && (
          <div className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5 fade-in-up delay-400">
            <div className="p-2 bg-teal-900/30 rounded-lg shrink-0 border border-teal-900/50">
               <Laptop className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">Software Used</p>
              <p className="text-xs text-gray-400 mt-0.5">{metadata.Software}</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-6 md:mt-8 italic bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 text-center">
        * More metadata might be hidden deeply. Processing will execute a systematic deep clean.
      </p>
    </div>
  );
}
