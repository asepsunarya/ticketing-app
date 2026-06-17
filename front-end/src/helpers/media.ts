type MediaType = "image" | "video" | "unknown";

const imageExtensions = ["jpg", "jpeg", "png"];
const videoExtensions = ["mp4", "avi", "mov"];

function getDataUrlMimeType(url: string): string {
  return url.slice(5, url.indexOf(';'));
}

function getFileExtension(url: string): string {
  if (url.startsWith('data:')) {
    const mimeType = getDataUrlMimeType(url);
    if (mimeType.includes('jpeg')) return 'jpg';
    if (mimeType.includes('png')) return 'png';
    if (mimeType.includes('mp4')) return 'mp4';
    return '';
  }

  const extension = url
    .toLowerCase()
    .slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
  const splitted = extension.split("?");
  return splitted[0];
}

export function checkMediaType(url: string): MediaType {
  if (url.startsWith('data:')) {
    const mimeType = getDataUrlMimeType(url);
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    return 'unknown';
  }

  const extension = getFileExtension(url);
  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown";
  }
}

export function getFilename(url: string) {
  if (url.startsWith('data:')) return 'lampiran-data-url';

  const urlParts = url.split("/");
  const lastPart = urlParts[urlParts.length - 1];
  const fileName = decodeURIComponent(lastPart.split("?")[0]);
  return fileName;
}
