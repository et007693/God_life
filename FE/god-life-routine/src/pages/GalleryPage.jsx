// 개인 미션 url : /personalMission/gallery
// 팀 미션 url : /teamMission/:teamId/gallery
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTeamGalleryImgData } from "../api/teamMissionApi";
import GalleryImgList from "../components/GalleryImgList";
import { getPersonalGalleryImgData } from '../api/personalMissionApi';

const GalleryPage = () => {
  // const { teamId } = useParams();
  // const [successRate, setSuccessRate] = useState(85);
  // const [searchParams] = useSearchParams();
  // const type = searchParams.get('type');

  // const { data, isFetching, isFetchingNextPage, isLoading, fetchNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["galleryImgData"],
  //     queryFn: getGalleryImgData,
  //     getNextPageParam: (lastPage, pages) => pages.length + 1,
  //     initialPageParam: 1,
  //   });

  const containerRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && !isLoading) {
  //         console.log("fetchNextPage");
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 0.9 }
  //   );

  //   const container = containerRef.current;
  //   if (container) {
  //     observer.observe(container);
  //   }
  //   return () => {
  //     if (container) {
  //       observer.unobserve(container);
  //     }
  //   };
  // }, [fetchNextPage]);

  const { teamId } = useParams();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;


  const { data, isFetching, isError } = useQuery({
    queryKey: ["galleryImgData"],
    queryFn: () => location.pathname.includes('team') ? getTeamGalleryImgData(teamId, year, month) : getPersonalGalleryImgData(year, month),
    staleTime: 0,
  });

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
                {data.successRate.toFixed(1)}%
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

export default GalleryPage;
