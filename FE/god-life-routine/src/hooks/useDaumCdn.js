import { useEffect, useState } from "react";

export const useDaumCdn = (ref) => {
    const {daum} = window
    const [address, setAddressFromCdn] = useState(null);   
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
        // 스크립트 로드 완료 후 실행
        script.onload = () => {
            if (daum == null || daum.Postcode == null) {
                console.log('다음 주소 cdn 로드 실패');
                return;
            }
            console.log('다음 주소 cdn 로드 완료');

            new daum.Postcode({
                oncomplete: function(data) {
                    console.log(data);
                }
            }).embed(ref.current);
              
        };
        
        return () => {
          document.body.removeChild(script);
        };
      }, [ref,daum]);

      return {address, setAddressFromCdn};
};
