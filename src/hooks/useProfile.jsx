import React, { useState } from 'react'

function useProfile() {
  // 사용자가 선택한 사진 저장
  const [value, setValue] = useState(null);
  // 사용자가 선택한 사진을 볼 수 있는 주소 (서버주소 or base64)
  const [photoUrl, setPhotoUrl] = useState(null);
  
  const onChange=e=> {
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload =()=>setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
      // 간단하게 만들기 위해 위처럼 작성함. 하지만 이게 바람직하지는 않음 로컬에서 이렇게 쓰면 안됨
      // 원래라면 사진을 업로드 하고 주소를 받아와야함
    } else {
      setPhotoUrl(null);
    }
  }

  return {value, photoUrl, onChange};
}

export default useProfile