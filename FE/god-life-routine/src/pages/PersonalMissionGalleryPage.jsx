import { useQuery } from '@tanstack/react-query';
import { getPersonalGalleryImgData } from '../api/personalMissionApi';
import { useRef } from 'react';
import Header from '../components/Header';
import GalleryImgList from "../components/GalleryImgList";


const PersonalMissionGalleryPage = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  
  const { data, isFetching, isError } = useQuery({
    queryKey: ["galleryImgData"],
    queryFn: () => getPersonalGalleryImgData(year, month),
    staleTime: 0,
  })

  const containerRef = useRef(null);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  
  return (
    <div>
      <Header title={"갤러리"} backgroundcolor={"orange"} color={"white"} />
      <div className="mt-16">
        <div className="flex bg-white bg-opacity-50 fixed w-full justify-end items-center px-4 py-2">
          <div className="text-center">
            <p className="text-[12px] text-gray-500">이달의 성공률</p>
            <div className="bg-white shadow-md rounded-lg p-2">
              <span className="text-xl font-bold text-orange-500">
                {data.successRate}%
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 pt-14">
          <GalleryImgList data={data.dayList} month={month} />
          <div className="w-full" ref={containerRef}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalMissionGalleryPage;