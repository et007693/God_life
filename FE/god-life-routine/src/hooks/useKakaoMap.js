import { useKakaoLoader } from "react-kakao-maps-sdk"



export const useKakaoMap = () => {
const [loading,error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
})

return { loading, error }
}