// TODO: типы и проверки ⚠️

export function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export function isFileTooBig(file: File, maxSize: number) {
  return file.size > maxSize;
}

// Создаёт dataURL, но может упасть
export function readFileAsDataURL(file: File): Promise<URL> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Нет обработки ошибок
export function formatFileSize(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
