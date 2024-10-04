import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/useUserStore";
import { getMyPageData } from "../api/myPageApi";
import { useEffect, useState } from "react";

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
