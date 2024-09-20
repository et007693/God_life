import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import login from '../api/authApi';
import useUserStore from '../store/useUserStore';
import { useMutation } from '@tanstack/react-query';

const KakaoLoginCallbackPage = () => {
const location = useLocation();
const navigate = useNavigate();
const {accessToken,setAccessToken} = useUserStore();
const {mutate:getAccessToken,} = useMutation(
    {
        mutationKey:['kakaoLoginCallback'],
        mutationFn: (code)=>login(code),
        onSuccess: (data) => {
            setAccessToken(data.headers.getAuthorization());
            navigate('/');
        }
    }
    
)
useEffect(() =>{
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    getAccessToken(code);
},[])

  return (
    <div>KakaoLoginCallbackPage</div>
  )
}

export default KakaoLoginCallbackPage