"use client";

import { useProcessor } from '@/hooks/useProcessor';
import UploadBox from '@/components/UploadBox';
import FileInfoCard from '@/components/FileInfoCard';
import MetadataPanel from '@/components/MetadataPanel';
import PreviewPanel from '@/components/PreviewPanel';
import ProgressBar from '@/components/ProgressBar';
import SanitizationReport from '@/components/SanitizationReport';
import ActionButtons from '@/components/ActionButtons';
import { Shield, RefreshCw } from 'lucide-react';

export default function Home() {
  const processor = useProcessor();

  return (
    <main className="min-h-screen bg-[#0B1F3A] p-6 py-12 md:py-20 flex flex-col items-center justify-between overflow-x-hidden relative">
      
      {/* BACKGROUND DEPTH SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Base Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A] via-[#0F2A44] to-[#1A1A1A] opacity-90"></div>

        {/* Layer 2: Floating Gradient Blobs (Blurred) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0A3A3A] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#0F2A44] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-blob2"></div>
        <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] bg-[#1A1A1A] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        
        {/* Subtle Purple Accent (As requested, very low opacity) */}
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-900 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob1" style={{ animationDelay: '5s' }}></div>

        {/* Layer 3: Abstract SVG Waves (Slow Motion) */}
        <div className="absolute top-0 left-0 w-full h-[150%] opacity-20 animate-wave-slow">
          <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-[120%] h-full -ml-[10%]">
             <path d="M0,320L48,346.7C96,373,192,427,288,432C384,437,480,395,576,346.7C672,299,768,245,864,245.3C960,245,1056,299,1152,320C1248,341,1344,320,1392,309.3L1440,299L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="url(#wave-grad-1)"></path>
             <defs>
               <linearGradient id="wave-grad-1" x1="0" y1="0" x2="0" y2="1">
                 <stop stopColor="#0A3A3A" stopOpacity="0.8"/>
                 <stop offset="1" stopColor="#0B1F3A" stopOpacity="0.1"/>
               </linearGradient>
             </defs>
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[120%] opacity-30 animate-wave-slower">
          <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-[150%] h-full -ml-[25%] rotate-180">
            <path d="M0,256L60,266.7C120,277,240,299,360,304C480,309,600,299,720,261.3C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,600L1380,600C1320,600,1200,600,1080,600C960,600,840,600,720,600C600,600,480,600,360,600C240,600,120,600,60,600L0,600Z" fill="url(#wave-grad-2)"></path>
             <defs>
               <linearGradient id="wave-grad-2" x1="0" y1="0" x2="0" y2="1">
                 <stop stopColor="#0F2A44" stopOpacity="0.9"/>
                 <stop offset="1" stopColor="#1A1A1A" stopOpacity="0"/>
               </linearGradient>
             </defs>
          </svg>
        </div>

        {/* Layer 4: Subtle Texture Overlay (Dotted grid pattern) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      {/* TOP CONTENT LAYER */}
      <div className="w-full max-w-5xl space-y-8 flex-1 relative z-10">
        {/* Header / Hero Section */}
        <div className="text-center space-y-6 mb-16 fade-in-up">
          <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-2 shadow-[0_0_40px_rgba(10,58,58,0.5)]">
            <Shield className="w-12 h-12 text-teal-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white pb-2">
            Data Peel
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            Peel away hidden data before you share.
          </p>
          <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-xl mt-6">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-foreground tracking-wide">
              Your files never leave your device. Processed locally.
            </span>
          </div>
        </div>

        {/* Error / Warning Alerts */}
        {processor.error && (
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-xl text-destructive font-medium shadow-lg fade-in-up">
            {processor.error}
          </div>
        )}

        {processor.warning && !processor.error && (
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-xl text-yellow-500 font-medium shadow-lg fade-in-up">
            {processor.warning}
          </div>
        )}

        {/* Upload Box */}
        {!processor.file && (
          <div className="fade-in-up delay-100 max-w-3xl mx-auto w-full">
            <UploadBox onUpload={processor.handleFileUpload} disabled={processor.isProcessing} />
          </div>
        )}

        {/* Main Processing Area */}
        {processor.file && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-card/60 backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-xl fade-in-up">
              <h2 className="text-xl font-bold text-foreground">Active Workspace</h2>
              <button 
                onClick={processor.resetState}
                disabled={processor.isProcessing}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-all disabled:opacity-50 hover:bg-white/5 py-2 px-4 rounded-lg"
              >
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
            </div>

            <div className="fade-in-up delay-100">
              <FileInfoCard file={processor.file} />
            </div>
            
            {!processor.report && processor.metadata && (
              <div className="fade-in-up delay-200">
                <MetadataPanel metadata={processor.metadata} />
              </div>
            )}

            <div className="fade-in-up delay-300">
              <PreviewPanel 
                previewUrl={processor.previewUrl} 
                processedUrl={processor.processedUrl}
                type={processor.file.type.startsWith('image/') ? 'image' : 'video'} 
              />
            </div>

            {/* Action Area */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl fade-in-up delay-400">
              {!processor.report ? (
                 <div className="flex flex-col items-center space-y-6">
                    <p className="text-center text-muted-foreground max-w-lg mb-2 text-lg">
                      Data Peel will deeply reconstruct your file to ensure all hidden metadata traces are permanently destroyed.
                    </p>
                    <button
                      onClick={processor.processFile}
                      disabled={processor.isProcessing || !processor.metadata}
                      className="w-full max-w-md bg-primary hover:bg-accent text-primary-foreground font-bold py-4 px-12 rounded-2xl text-xl shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      {processor.isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                          <RefreshCw className="w-6 h-6 animate-spin" />
                          Processing Locally...
                        </div>
                      ) : "Sanitize File Now"}
                      
                      {!processor.isProcessing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                      )}
                    </button>
                    <div className="w-full max-w-md">
                      <ProgressBar progress={processor.progress} isProcessing={processor.isProcessing} />
                    </div>
                 </div>
              ) : (
                <div className="space-y-6">
                  <SanitizationReport report={processor.report} />
                  <ActionButtons 
                    fileUrl={processor.processedUrl} 
                    fileName={processor.processedFile?.name} 
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-24 text-center text-muted-foreground text-sm opacity-80 flex flex-col items-center gap-3 pb-4 fade-in-up delay-500 w-full">
         <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 bg-card/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/5">
            <span className="font-semibold text-foreground">Built by Shuban</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:shuban1227@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
              shuban1227@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="https://github.com/shuban2007" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors font-medium">
              GitHub
            </a>
         </div>
         <p className="mt-2 text-xs opacity-60">
            Data Peel guarantees absolute privacy. No backend • No APIs • No active storage • 100% Client-Side
         </p>
      </footer>
    </main>
  );
}
