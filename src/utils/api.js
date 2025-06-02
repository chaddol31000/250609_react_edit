// 설정을 추가한 axios 객체를 리턴
// api 서버 기본 주소와 withCredential 설정을 추가한 axios 객체를 생성한 다음 export
// 다른 곳에서는 이 api 객체를 이용해 rest 통신을 수행하자

import axios from "axios";


const api = axios.create({baseURL:'http://localhost:8080', withCredential: true});

export default api;