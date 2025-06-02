import React from 'react'
import { Pagination } from 'react-bootstrap'
import { create } from 'zustand'
// store 는 zustand 나 redux 가 사용하는 외부 상태 저장공간

// 서버에서 데이터를 읽어올 때는 store 에 저장하고 UI 컴포넌트로 출력
// 서버로 데이터를 보낼 때는 custom hook 으로 저장 및 검증 + UI 컴포넌트

// 예를 들어 /read?pno=11 에서 변경하기 버튼을 눌러 /update?pno=11 로 이동했다고 하면
  // 여기서 이미 11번 글을 읽어왔기 때문에 굳이 11번 글을 새로 읽어올 필요가 없다


// zustand 스토어는 create 함수로 생성한다
// create 함수의 파라미터는 set 함수가 전달되고 리턴을 객체를 리턴한다
// set 도 zustand 가 자동으로 넣어준다
const usePostStore=create((set)=> {
  return {
    posts:null,
    pagination: null,

    // 상태를 바꾸는 함수는 useState 의 함수형 업데이트처럼 작성한다
    // state 는 최신의 usePostStore 객체 → 객체에서 posts 속성만 파라미터 params 로 바꿔라
    setPosts:(params)=>set(state=>({...state, posts:params})),
    setPagination: (params)=>set(state=>({...state, pagination:params})),
  }
})

export default usePostStore