import { useState } from "react";

const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function useEmail() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange=e=> setValue(e.target.value);

  const onBlur=()=> {
    setMessage('');
    if(pattern.test(value))
      return true;
    setMessage('이메일을 올바르게 입력해주세요');
    return false;
  }
  
  return {value, message, onChange, onBlur};
}

export default useEmail