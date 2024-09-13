import React, { useEffect, useCallback } from 'react'
import useRoomInfo from '../store/useRoomInfo';

const PersonalMissionDetailPage = () => {
  const { setRoomNumber, setRoomType } = useRoomInfo();

  useEffect(() => {
    setRoomNumber(null);
    setRoomType('personal');
    }, [setRoomNumber,setRoomType]);
  return (
    <div>PersonalMissionDetailPage</div>
  )
}

export default PersonalMissionDetailPage