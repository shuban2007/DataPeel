import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

let ffmpeg = null;

const loadFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;
  
  ffmpeg = new FFmpeg();
  
  ffmpeg.on('progress', ({ progress }) => {
    // Post progress back to main thread
    self.postMessage({ status: 'progress', payload: { ratio: progress } });
  });

  // Load ffmpeg.wasm-core
  // Since we are not using SharedArrayBuffer natively yet without headers,
  // we use the default full load.
  await ffmpeg.load({
    coreURL: await toBlobURL(`https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  return ffmpeg;
};

const toBlobURL = async (url, mimeType) => {
  const resp = await fetch(url);
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
};

self.onmessage = async (e) => {
  const { type, file } = e.data;

  if (type === 'start') {
    try {
      const ffmpegInstance = await loadFFmpeg();
      
      const inputName = 'input_video';
      const outputName = 'output_video.mp4';
      
      // Write file to in-memory file system
      await ffmpegInstance.writeFile(inputName, await fetchFile(file));
      
      // Execute FFmpeg to remove metadata and chapters, and only map video/audio streams
      // -map_metadata -1 : Strips global metadata
      // -map_chapters -1 : Removes chapter markers
      // -map 0:v? -map 0:a? : Maps video and audio streams, ignoring data streams (subtitles, attachments)
      // -c copy : Try to copy streams to save time, if it fails, we fall back to re-encoding
      // -c:v libx264 -c:a aac : Ensure valid web format
      const args = [
        '-i', inputName,
        '-map_metadata', '-1',
        '-map_chapters', '-1',
        '-map', '0:v?',
        '-map', '0:a?',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-c:a', 'aac',
        '-y',
        outputName
      ];

      await ffmpegInstance.exec(args);
      
      // Read back the sanitized file
      const data = await ffmpegInstance.readFile(outputName);
      
      // Cleanup FFmpeg filesystem
      await ffmpegInstance.deleteFile(inputName);
      await ffmpegInstance.deleteFile(outputName);
      
      self.postMessage({ 
        status: 'done', 
        payload: { data: new Uint8Array(data) } 
      });

    } catch (err) {
      self.postMessage({ 
        status: 'error', 
        payload: { error: err.message || "FFmpeg processing failed" } 
      });
    }
  }
};
