import { create } from "zustand";

const useMemberStore = create((set)=>({
  // 비밀번호 확인 여부
  isPasswordVerified: false,

  setPasswordVerified: ()=>set(state=>({...state, isPasswordVerified: true}))
}))

export default useMemberStore;