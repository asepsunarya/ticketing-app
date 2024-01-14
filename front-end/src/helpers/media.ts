type MediaType = "image" | "video" | "unknown";

const imageExtensions = ["jpg", "jpeg", "png"];
const videoExtensions = ["mp4", "avi", "mov"];

function getFileExtension(url: string): string {
  const extension = url
    .toLowerCase()
    .slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
  const splitted = extension.split("?");
  return splitted[0];
}

export function checkMediaType(url: string): MediaType {
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
  const urlParts = url.split("/");
  const lastPart = urlParts[urlParts.length - 1];
  const fileName = decodeURIComponent(lastPart.split("?")[0]);
  return fileName;
}
