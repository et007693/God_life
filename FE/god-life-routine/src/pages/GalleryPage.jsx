// 개인 미션 url : /personalMission/gallery
// 팀 미션 url : /teamMission/:teamId/gallery
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGalleryImgData } from "../api/personalMissionApi";
import GalleryImgList from "../components/GalleryImgList";
const GalleryPage = () => {
  const { teamId } = useParams();
  const [successRate, setSuccessRate] = useState(85);
  const { data, isFetching, isFetchingNextPage, isLoading, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["galleryImgData"],
      queryFn: getGalleryImgData,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      initialPageParam: 1,
    });
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          console.log("fetchNextPage");
          fetchNextPage();
        }
      },
      { threshold: 0.9 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }
    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [fetchNextPage]);

  return (
    <div>
      <div className="flex bg-white bg-opacity-50 fixed w-full justify-end items-center px-4 py-2">
        <Header goBack={"/"}></Header>
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">이달의 성공률</p>
          <div className="bg-white shadow-md rounded-lg p-2">
            <span className="text-xl font-bold text-orange-500">
              {successRate}%
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-20">
        {data && data.pages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <GalleryImgList data={data.pages} />
            <div className="w-full" ref={containerRef}></div>
          </div>
        )}
      </div>
      {isFetchingNextPage && <div className="text-center">로딩중...</div>}
    </div>
  );
};

export default GalleryPage;
