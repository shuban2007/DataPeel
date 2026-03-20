import { ShieldCheck } from 'lucide-react';

export default function SanitizationReport({ report }) {
  if (!report) return null;

  return (
    <div className="glass-panel p-8 rounded-2xl border-l-[6px] border-l-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.1)] fade-in-up relative z-20">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-teal-500/10 rounded-xl border border-teal-500/20">
          <ShieldCheck className="w-8 h-8 text-teal-400" />
        </div>
        Sanitization Report
      </h3>
      <ul className="space-y-4">
        {report.locationRemoved && (
          <li className="flex items-center gap-4 text-sm text-gray-200 font-medium bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl border border-white/5 fade-in-up delay-100">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-400 flex items-center justify-center text-sm shadow-lg">✓</span>
            Location data permanently removed
          </li>
        )}
        {report.deviceRemoved && (
          <li className="flex items-center gap-4 text-sm text-gray-200 font-medium bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl border border-white/5 fade-in-up delay-200">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-400 flex items-center justify-center text-sm shadow-lg">✓</span>
            Device and camera information removed
          </li>
        )}
        {report.metadataRemoved && (
          <li className="flex items-center gap-4 text-sm text-gray-200 font-medium bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl border border-white/5 fade-in-up delay-300">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-400 flex items-center justify-center text-sm shadow-lg">✓</span>
            Hidden tracking metadata destroyed
          </li>
        )}
        {report.anonymized && (
          <li className="flex items-center gap-4 text-sm text-gray-200 font-medium bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl border border-white/5 fade-in-up delay-400">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-400 flex items-center justify-center text-sm shadow-lg">✓</span>
            File fully anonymized and reconstructed
          </li>
        )}
      </ul>
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 fade-in-up delay-500 justify-center">
         <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span>
         <p className="text-sm text-teal-400 font-bold uppercase tracking-widest">
            Ready for Safe Sharing
         </p>
      </div>
    </div>
  );
}
