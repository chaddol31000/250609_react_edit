import React, { useState } from 'react'

//  useInput 은 필수 입력만 체크 / 나머지 애들은 패턴도 체크크
function useInput() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange =e=> setValue(e.target.value);

  const onBlur=()=> {
    setMessage('');
    if(value!=='') // 입력창에 입력을 안했다면?
      return true;
    setMessage('필수 입력입니다.')
    return false;
  }

  return {value, message, onChange, onBlur, setValue};
}

export default useInput