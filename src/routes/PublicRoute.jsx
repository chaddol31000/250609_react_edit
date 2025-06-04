import React from 'react'
import useAuthStore from '../stores/useAuthStore'
import { Navigate } from 'react-router-dom';

// 비로그인이면 접근 가능

function PublicRoute({element}) {
  // 여기서 element 는 MemberLogin, MemberSignup
  const username = useAuthStore(state=>state.username);

  // 로그인이 되어있다면 루트 경로를 렌더링
  // 비로그인이면 전달받은 element 를 렌더링
  return username? <Navigate to="/" />:element;
}

export default PublicRoute