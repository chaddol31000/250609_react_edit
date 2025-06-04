import React from 'react'
import api from '../utils/api';
import { create } from 'zustand';

const useAuthStore=create(set=>({
  // 로그인 여부는 username 으로 구분
  // 로그인 했으면 아이디가, 비로그인이면 null 로 처리
  // undefined 는 뭐야? 아직 처리하지 않았다 (미확인)

  username: undefined,
  
  // authStore 에 로그인 정보가 들어있는데... 이 상태는 f5 키 누르면 사라짐
  // 그래서 어떻게 대처해?
    // ㄴ 앱이 리로딩 되면 로그인 상태를 확인하게 하겠다
      // ㄴ 그러기 위해서 authStore 에 아이디를 set 하는 함수를 하나 만든다
  // checkAuth 는 App.js 에 갖다 붙일 예정
  checkAuth:async()=> {
    try {
      const response = await api.get("/api/auth/check");
      set(state=> ({...state, username:response.data.username}));
    } catch(err) {
      console.log(err);
      set(state=>({...state, username:null}));
    }
  },
  // 로그인 성공했을 때 아이디를 set
  // setUsername은 MemberLogin 에 갖다 붙일 예정
  setUsername:(param)=>set(state=>({...state, username:param})),

  // logout 에 들어갈 함수
  // 문제가 생겼을 때 console.log 를 찍어보려면 객체이기 때문에 그냥 대괄호 치고 쳐보면 됨
  
  resetUsername:()=>set(state=>({...state, username:null}))
}))

export default useAuthStore