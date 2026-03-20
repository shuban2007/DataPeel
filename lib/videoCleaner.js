export const cleanVideo = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    // We launch a dedicated Web Worker to run FFmpeg 
    // This ensures the main UI thread never freezes.
    
    let worker;
    try {
      worker = new Worker(new URL('../workers/ffmpegWorker.js', import.meta.url), {
        type: 'module'
      });
    } catch (e) {
      return reject(new Error("Failed to initialize video processing worker."));
    }

    worker.onmessage = (e) => {
      const { status, payload } = e.data;

      switch (status) {
        case 'progress':
          if (onProgress) {
            onProgress(payload.ratio);
          }
          break;
        case 'done':
          // Construct the new file blob from the Uint8Array returned by ffmpeg
          const blob = new Blob([payload.data], { type: 'video/mp4' }); // Assuming mp4 output
          const cleanFile = new File([blob], `clean_${file.name.split('.')[0] || 'video'}.mp4`, { type: 'video/mp4' });
          worker.terminate();
          resolve(cleanFile);
          break;
        case 'error':
          worker.terminate();
          reject(new Error(payload.error || "Video processing failed."));
          break;
      }
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(new Error("Worker error: " + err.message));
    };

    // Send the file to worker
    worker.postMessage({ type: 'start', file });
  });
};
