import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/useUserStore";
import { getMyPageData } from "../api/myPageApi";
import { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";

export const useMyPage = () => {
  const { setUserMyPageData } = useUserStore();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["myPageData"],
    queryFn: getMyPageData,
    staleTime: 0,
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (data != null) {
      setUserMyPageData(data);
    }
  }, [data, setUserMyPageData]);

  const handleButtonClick = () => {
    axiosApi.delete("/api/v1/member")
    .then((res) => {
      console.log("회원탈퇴성공");
      window.location.href = "/login";
    })
    .catch((err) => {
      console.log(err);
    })
    setShowModal(false);
  };

  return {
    data,
    isFetching,
    isError,
    showModal,
    setShowModal,
    handleButtonClick,
  };
};
