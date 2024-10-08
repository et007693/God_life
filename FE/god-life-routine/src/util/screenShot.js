import html2canvas from "html2canvas";

export const createScreenShotToFormData = async (elementId,resizeOffset) => {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const blob = await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg",resizeOffset);
  });  
  return blob;
}