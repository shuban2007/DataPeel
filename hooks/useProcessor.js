import { useState, useCallback } from 'react';
import { cleanImage } from '../lib/imageCleaner';
import { cleanVideo } from '../lib/videoCleaner';
import { validateFile } from '../lib/validateFile';
import { cleanUpUrl } from '../utils/cleanup';
import exifr from 'exifr';

export const useProcessor = () => {
  const [file, setFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  
  const [metadata, setMetadata] = useState(null);
  const [report, setReport] = useState(null); // Sanitization Report

  const resetState = () => {
    if (previewUrl) cleanUpUrl(previewUrl);
    if (processedUrl) cleanUpUrl(processedUrl);
    
    setFile(null);
    setProcessedFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
    setWarning(null);
    setMetadata(null);
    setReport(null);
  };

  const extractMetadata = async (fileObj) => {
    if (fileObj.type.startsWith('video/')) {
      // Basic extraction for video if needed, but exifr mainly does images
      setMetadata({ type: 'video', note: "Video metadata is natively embedded. It will be completely removed during FFmpeg processing." });
      return;
    }
    
    try {
      // Extract comprehensive EXIF data
      const data = await exifr.parse(fileObj, { gps: true, exif: true, itf: true, ifd0: true });
      if (data) {
        setMetadata({
          Make: data.Make,
          Model: data.Model,
          DateTimeOriginal: data.DateTimeOriginal || data.CreateDate,
          Software: data.Software,
          Latitude: data.latitude,
          Longitude: data.longitude,
          ...data
        });
      } else {
        setMetadata({});
      }
    } catch (err) {
      console.error(err);
      setMetadata({}); // None found or parsing error
    }
  };

  const handleFileUpload = async (uploadedFile) => {
    resetState();
    const validation = validateFile(uploadedFile);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    if (validation.warning) {
      setWarning(validation.warning);
    }

    setFile(uploadedFile);
    
    // Create preview
    const URLObj = window.URL || window.webkitURL;
    setPreviewUrl(URLObj.createObjectURL(uploadedFile));

    // Async extraction
    await extractMetadata(uploadedFile);
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setReport(null);

    try {
      let sanitizedFile;
      if (file.type.startsWith('image/')) {
        // Fast canvas redraw
        setProgress(50);
        sanitizedFile = await cleanImage(file);
        setProgress(100);
      } else if (file.type.startsWith('video/')) {
        // Worker-based FFmpeg execution
        sanitizedFile = await cleanVideo(file, (ratio) => {
          setProgress(Math.round(ratio * 100) || 0);
        });
        setProgress(100);
      }

      if (sanitizedFile) {
        setProcessedFile(sanitizedFile);
        const URLObj = window.URL || window.webkitURL;
        setProcessedUrl(URLObj.createObjectURL(sanitizedFile));
        
        // Generate Sanitization Report
        setReport({
          locationRemoved: true,
          deviceRemoved: true,
          metadataRemoved: true,
          anonymized: true
        });
      }

    } catch (err) {
      setError(err.message || "Failed to process file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    file,
    processedFile,
    previewUrl,
    processedUrl,
    isProcessing,
    progress,
    error,
    warning,
    metadata,
    report,
    handleFileUpload,
    processFile,
    resetState
  };
};
