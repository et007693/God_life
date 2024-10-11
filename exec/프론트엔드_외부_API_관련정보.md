## 사용 외부 API
- 카카오 맵
- 카카오 메신저 

### api 키 적용방법
- FE/src/.env 파일 내에 API 키 등록
```
VITE_KAKAO_MAP_API_KEY={js key 등록}
VITE_KAKAO_TEMPLATE_ID={"112039" 커스텀메신져아이디}
VITE_KAKAO_API_KEY={api key}
VITE_KAKAO_REST_API_KEY={rest api key}
```
- index.html 파일 kakaomap api key 키 등록
```html
    <script
      type="text/javascript"
      src="https://dapi.kakao.com/v2/maps/sdk.js?appkey={appkey}&libraries=services"
    ></script>
```