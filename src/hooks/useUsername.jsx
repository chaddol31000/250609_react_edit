import React, { useState } from 'react'
import { idAvailableCheck } from '../utils/memberAPI';

// useUsername 은 회원가입, 로그인 할 때 사용하겠다
// 회원가입할 때는 사용가능한지 서버와 통신이 필요함
// 로그인 할 때는 불필요 → availableCheck

const pattern = /^[0-9A-Za-z]{6,10}$/;

function useUsername(availableCheck=false) {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange=e=>setValue(e.target.value.toLowerCase());

  const onBlur=async()=> {
    setMessage('');
    if(!pattern.test(value)) {
      setMessage('아이디는 소문자와 숫자 6~10자 입니다');
      return false;
    }
    // 패턴 체크에 성공 && 사용 가능 여부 확인 필요
    if(availableCheck) {
      try {
        await idAvailableCheck(value);
        return true;
      } catch(err) {
        if(err.status===409)
          setMessage('사용중인 아이디입니다');
        else
          console.log(err);
        return false;
      }
    }
    // 패턴 체크 성공 && 사용 가능 여부 확인 불필요
    return true;
  }
  return {value, message, onChange, onBlur};
}

export default useUsername