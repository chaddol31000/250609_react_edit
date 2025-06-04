import React, { useState } from 'react'
import TextField from '../../components/commons/TextField'
import usePassword from '../../hooks/usePassword'
import useUsername from '../../hooks/useUsername'
import useConfirmPassword from '../../hooks/useComfirmPassword';
import useEmail from '../../hooks/useEmail';
import BlockButton from '../../components/commons/BlockButton';
import useProfile from '../../hooks/useProfile';
import ProfileField from '../../components/members/ProfileField';
import api from '../../utils/api';
import { AsyncStatus } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { signup } from '../../utils/memberAPI';

// 아이디, 비번, 비번 확인, 이메일 입력 받기

// 가장 기본적이고 반복되기에 components 로 따로 뺌
// 검증 과정은 hook 으로 빼기


function MemberSignup() {
  const [submittingStatus, setSubmittingStatus] = useState(AsyncStatus.IDLE);
  const navigate = useNavigate();

  const vProfile = useProfile();
  const vPassword = usePassword();
  const vUsername = useUsername(true);
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();

  const doSignup=async()=> {
    setSubmittingStatus(AsyncStatus.SUBMITTING);

    const r1 = vUsername.onBlur();
    const r2 = vPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    const r4 = vEmail.onBlur();

    if(!(r1 && r2 && r3 && r4)){
      setSubmittingStatus(AsyncStatus.IDLE);
      return;
    }

    const formData = new FormData();
    formData.append('profile', vProfile.value);
    formData.append('username', vUsername.value);
    formData.append('password', vPassword.value);
    formData.append('email', vEmail.value);

    try {
      const response = await signup(formData);
      setSubmittingStatus(AsyncStatus.SUCCESS);
      // navigate 가 되도 현재 컴포넌트는 보이지는 않지만 렌더링은 계속된다
      navigate("/member/login");
    } catch(err) {
      setSubmittingStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }
  // 속성의 이름과 조건이 똑같다면 구조분해 할당이 가능함 (축약 표현임)
    // 구조분해 할당은 이름, 값, 이름, 값 이렇게 다 나눠주는 것임
    // 똑같이 반복되는 이름 onChange={vUsername.onChange} onBlur={vUsername.onBlur} message={vUsername.message} 을
      // 깔끔하게 만들기 위해 축약 표현인 구조분해할당을 통해 {...vUsername} 으로 작성
  return (
    <div>
      {submittingStatus===AsyncStatus.FAIL && <Alert variant='danger'>회원가입에 실패했습니다</Alert>}
      <ProfileField name='profile' label='프로필' {...vProfile} />
      <TextField name='username' label='아이디' {...vUsername} />
      <TextField name='password' type='password' label='비밀번호' {...vPassword} />
      <TextField name='password' type='password' label='비밀번호 확인' {...vConfirmPassword} />
      <TextField name='email' label='이메일' {...vEmail} />
      {/*
        버튼을 클릭하면 버튼을 비활성화하고 글자를 가입 처리 중으로 바꿔라
      */}
      <BlockButton 
        label={submittingStatus===AsyncStatus.SUBMITTING? "가입처리 중":"회원 가입"}
        styleName='primary' onClick={doSignup}
        disabled = {submittingStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberSignup