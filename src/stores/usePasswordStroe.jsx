const { create } = require("zustand");

const usePasswordStore = create((set)=>({
  // 비밀번호 확인 여부
  isPasswordVerified: false,

  setPasswordVerified: ()=>set(state=>({...state, isPasswordVerified: true}))
}))

export default usePasswordStore;