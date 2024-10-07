import html2canvas from "html2canvas";

export const createScreenShotToFormData = async (elementId) => {
  const element = document.getElementById(elementId);
  
  // SVG 요소 찾기
  const svgElements = element.querySelectorAll('svg');
  
  // SVG 요소를 캔버스로 변환
  const svgCanvases = await Promise.all(Array.from(svgElements).map(async (svg) => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    await new Promise(resolve => img.onload = resolve);
    
    const canvas = document.createElement('canvas');
    canvas.width = svg.getBoundingClientRect().width;
    canvas.height = svg.getBoundingClientRect().height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return { svg, canvas };
  }));
  
  // 원본 SVG를 캔버스로 임시 대체
  svgCanvases.forEach(({ svg, canvas }) => {
    svg.style.display = 'none';
    svg.parentNode.insertBefore(canvas, svg);
  });
  
  // 스크린샷 캡처
  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: window.devicePixelRatio,
  });
  
  // 원본 SVG 복원
  svgCanvases.forEach(({ svg, canvas }) => {
    svg.style.display = '';
    canvas.remove();
  });
  
  // 캔버스를 Blob으로 변환
  const blob = await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg", 0.7);
  });
  
  return blob;
};