export const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_VIDEO_SIZE = 1024 * 1024 * 1024; // 1GB

export const WARN_IMAGE_SIZE = 25 * 1024 * 1024; // 25MB
export const WARN_VIDEO_SIZE = 250 * 1024 * 1024; // 250MB

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: "No file provided." };
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    return { valid: false, error: "Unsupported file type. Please upload an image or video." };
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: "Image exceeds the maximum allowed size of 100MB." };
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return { valid: false, error: "Video exceeds the maximum allowed size of 1GB." };
  }

  let warning = null;
  if (isImage && file.size > WARN_IMAGE_SIZE) {
    warning = "Large image detected. Processing may take a moment.";
  } else if (isVideo && file.size > WARN_VIDEO_SIZE) {
    warning = "Large video detected. Processing may take several minutes depending on your device.";
  }

  return { valid: true, type: isImage ? "image" : "video", warning };
};
