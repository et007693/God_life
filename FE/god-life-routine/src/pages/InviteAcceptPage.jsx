import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptInvite } from '../api/inviteApi';
import { useMutation } from '@tanstack/react-query';
import useRedirectStore from '../store/useRedirectStore';

const InviteAcceptPage = () => {
  const {teamId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {mutate} = useMutation({
    mutationFn: (teamId)=>acceptInvite(teamId),
    onSuccess: () => {
      navigate(`/teamMission/${teamId}`);
    },
  });
  const {setRedirectUrl} = useRedirectStore();
  const onClickAcceptBtn = () => {
    mutate(teamId);
  }
  const onClickRejectBtn = () => {
    navigate("/");
  }
  useEffect(()=>{
    if(localStorage.getItem("accessToken") == null){
      localStorage.setItem("redirectUrl",location.pathname);
      navigate("/login");
    }
  },[location.pathname])
  return (
    <div className='h-screen flex flex-col justify-items-center items-center'>
      <Header title={'초대 수락'} color={'orange'} goBack={"/"}/>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>초대 수락</h1>
        <p className='text-sm text-gray-500'>초대를 수락하면 팀에 참여할 수 있습니다.</p>
      </div>
      <div className='flex flex-row gap-4 items-center justify-center h-full'>
        <button className='bg-orange-500 text-white px-4 py-2 rounded-md' onClick={onClickAcceptBtn}>초대 수락</button>
        <button className='bg-gray-500 text-white px-4 py-2 rounded-md' onClick={onClickRejectBtn}>초대 거절</button>
      </div>
    </div>
  )
}

export default InviteAcceptPage