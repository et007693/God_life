import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import login from '../api/authApi';
import useUserStore from '../store/useUserStore';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const KakaoLoginCallbackPage = () => {
const location = useLocation();
const cookies =  useCookies(['accessToken']);
const navigate = useNavigate();
const {accessToken,setAccessToken} = useUserStore();
const {mutate:getAccessToken,} = useMutation(
    {
        mutationKey:['kakaoLoginCallback'],
        mutationFn: (code)=>login(code),
        onSuccess: (data) => {
            console.log("안녕하세요");
            
            console.log(cookies.accessToken);
            
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