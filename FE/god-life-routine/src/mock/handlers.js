// mock서버에서 controller역할을 하는 자바스크립트파일
import {http, HttpResponse} from 'msw';
const generateAccessToken = () => {
    return 'mock_access_token_' + Math.random().toString(36).substr(2, 9)
  }

  let myPageDataList = [
    {
        "id": 1,
        "nickname": "송창용",
        "profileImage": "https://avatars.githubusercontent.com/u/103542723?v=4",
        "mileage": 10000,
        "fineImmunityCount": 8
      }
]
let teamMissionList =  [
    {
      "id":"1",
      "memberList": [
        {
          "id": 1,
          "name": "송창용",
          "profileImage": "https://avatars.githubusercontent.com/u/103542723?v=4"
        },
        {
          "id": 2,
          "name": "김규림",
          "profileImage": "https://avatars.githubusercontent.com/u/10101023?v=4"
        },
        {
          "id": 3,
          "name": "조창훈",
          "profileImage": "https://avatars.githubusercontent.com/u/21821321?v=4"
        }
      ],
      "teamName": "송창송창용",
      "accountBank": "싸피",
      "accountNumber": "1234567890",
      "fineGathered": 10000,
      "fineDelayed": 2500,
      "rule": {
        "ruleType": "wakeup",
        "ruleDetail": "일찍일어나기",
        "ruleChecked": false,
        "ruleSetted": true,
        "ruleTime": "오전 1시 1분",
        "ruleLocation": null
      }
    },
    {
      "id":"2",
      "memberList": [
        {
          "id": 1,
          "name": "송창용",
          "profileImage": "https://avatars.githubusercontent.com/u/103542723?v=4"
        },
        {
          "id": 2,
          "name": "김규림",
          "profileImage": "https://avatars.githubusercontent.com/u/10101023?v=4"
        },
        {
          "id": 3,
          "name": "조창훈",
          "profileImage": "https://avatars.githubusercontent.com/u/21821321?v=4"
        }
      ],
      "teamName": "송창송창용",
      "accountBank": "싸피",
      "accountNumber": "1234567890",
      "fineGathered": 20000,
      "fineDelayed": 3500,
      "rule": {
        "ruleType": "exercise",
        "ruleDetail": "운동하기",
        "ruleChecked": false,
        "ruleSetted": false,
        "ruleTime": null,
        "ruleLocation": {
          "latitude": 37.5666805,
          "longitude": 126.9784147
        }
      }
    }
  ]


let personalMission = {
  "profileImage": "https://avatars.githubusercontent.com/u/103542723?v=4",
  "nickname": "송창용",
  "mainAccountNo": "1234567890",
  "runningDate": 159,
  "remainingDate": 189,
  "successRate": 80,
  "interestRate": 4,
  "primeRate": 8.6,
  // 수정이 필요한 부분
  "rule": {
    // "ruleType": "wakeup",
    "ruleType": "exercise",
    // "ruleDetail": "일찍 일어나기",
    "ruleDetail": "운동하기",
    "ruleChecked": false,
    "ruleSetted": false,
    "ruleTime": null,
    "ruleLocation": {
      "latitude": null,
      "longitude": null
    }
  }
}

const isAuthenticated = async (req)=>{
  const request = await req;
  console.log(request);
  
  if(!request?.headers?.has("Authorization")){
    throw new HttpResponse(null,{status:401})
  }
}

export const handlers = [
    // 임시 로그인 - 카카오로그인이 현재 액세스토큰을 전달해오지 않기 때문에 임시로 로그인 api생성
    http.post('/api/v1/login',(request)=>{
      console.log(request);
      
        const accessToken = generateAccessToken()
        // const code = request.url.searchParams.get('code')
        return new HttpResponse(null, {
          status: 302,
          headers: {
            "Set-Cookie":`accessToken=${accessToken}`,
            "Location":"/"
          }})}),
          // 메인페이지 영역
    http.get('/api/v1', async ({request})=>{
        // 엑세스토큰을 헤더에서 가져온다. 요청마다 헤더에 들어갈 예정
        
        // if(!accessToken){
        //   // 엑세스토큰이 없는 경우 401
        //     return new HttpResponse(null,{status: 401})
        // }
        // 액세스토큰이 있으면 
        await isAuthenticated(request);
        return HttpResponse.json({
                "personalMission": {
                  "id": 1,
                  "title": "운동하기",
                  "isDone": false
                },
                "groupMissions": [
                  {
                    "id": 1,
                    "title": "일찍 일어나기",
                    "isDone": true
                  },
                  {
                    "id": 2,
                    "title": "운동하기",
                    "isDone": false
                  }
                ],
                "message": "미션 조회에 성공하였습니다."
              },)
            }),
        // 마이페이지 영역
        http.get('/api/v1/mypage',()=>{
          return HttpResponse.json(myPageDataList[0],{status:200})
        }),
        http.patch('/api/v1/mypage', async ({request})=>{
          const {id, count} = await request.json();
          const userMyPageData = myPageDataList.find(data=>data.id===id)
          
          userMyPageData.fineImmunityCount += count
          userMyPageData.mileage -= count*2000
          return  HttpResponse.json(userMyPageData,{status:200})
        }),
        // 팀미션 영역
        http.get('/api/v1/teamMission/:id',({params})=>{
          const teamMissionData = teamMissionList.find(data=>data.id===params.id)
          return HttpResponse.json(teamMissionData,{status:200})
        }),
        http.patch('/api/v1/teamMission/:id', async ({params,request})=>{
          const {rule} = await request.json();
          
          const teamMissionData = teamMissionList.find(data=>data.id===params.id)
          teamMissionData.rule = rule
          return HttpResponse.json(teamMissionData,{status:200})
        }),
        // 개인미션영역
        http.get('/api/v1/personalMission',async ({request})=>{
          await isAuthenticated(request);
          return HttpResponse.json(personalMission,{status:200})
        }),

        http.patch('/api/v1/personalMission', async ({request})=>{
          const {rule} = await request.json();
          personalMission.rule = {...personalMission.rule, ...rule}
          return HttpResponse.json(personalMission,{status:200})
        }),


]