import html2canvas from "html2canvas";
import checkImage from "/images/check.png";
export const createScreenShotToFormData = async (elementId) => {
  const element = document.getElementById(elementId);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = await html2canvas(element,{
    width: width,
    height: width,
    x: 0,
    y: (height-width)/2,
  });
  const blob = await new Promise((resolve) => {
    const ctx = canvas.getContext('2d');
    const check = new Image();
    check.src = checkImage;
    check.onload = () => {
      ctx.drawImage(check, 0, (height/2)-(width/2), width, width);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg",0.7);
    };
  });
  
  return blob;
}