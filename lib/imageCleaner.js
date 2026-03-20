export const cleanImage = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const URLObj = window.URL || window.webkitURL;
      const objectUrl = URLObj.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas to original image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image effectively strips EXIF via Canvas redraw
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Determine format: retain PNG/WebP, else default to JPEG for standard
        let mimeType = "image/jpeg";
        let quality = 0.95;
        if (file.type === "image/png" || file.type === "image/webp") {
          mimeType = file.type;
        }

        // Export the stripped image
        canvas.toBlob(
          (blob) => {
            URLObj.revokeObjectURL(objectUrl);
            if (blob) {
              const sanitizedFile = new File([blob], `clean_${file.name}`, { type: mimeType });
              resolve(sanitizedFile);
            } else {
              reject(new Error("Canvas export failed."));
            }
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => {
        URLObj.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image for processing."));
      };

      img.src = objectUrl;
    } catch (error) {
      reject(error);
    }
  });
};
