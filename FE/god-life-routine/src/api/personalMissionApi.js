import galleryImgData from '../assets/galleryImgdata.json';
import axios from "axios";

export const getGalleryImgData = async (page) => {
    console.log(page);
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            const startIndex = (page.pageParam - 1) * 5;
            const endIndex = startIndex + 5;
            const paginatedData = galleryImgData.slice(startIndex, endIndex);
            resolve(paginatedData);
        }, 1000);
    });


    return response;
//   const response = await axios.get('/api/galleryImgData');
//   return response.data;
};