import React, { useState } from 'react'
import usePassword from '../../hooks/usePassword'
import useConfirmPassword from '../../hooks/useComfirmPassword';
import TextField from '../../components/commons/TextField';
import BlockButton from '../../components/commons/BlockButton';
import { AsyncStatus } from '../../utils/constant';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../utils/memberAPI';

function MemberChangePassword() {
  // 1. 필요한 기능들(작성 상태, 비밀번호, 새 비밀번호, 새 비밀번호 확인) 훅을 생성
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vCurrentPassword = usePassword();
  const vNewPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vNewPassword);
  const navigate = useNavigate();

  // 2. 비밀번호 변경 처리
  const doChangePassword=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = vCurrentPassword.onBlur();
    const r2 = vNewPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();

    if(!(r1 && r2 && r3)) {
      setStatus(AsyncStatus.IDLE);
    }

    try {
      const requestForm = {currentPassword:vCurrentPassword.value, newPassword:vNewPassword.value};
      await changePassword(requestForm);
      setStatus(AsyncStatus.SUCCESS);
      // 입력 내용을 모두 지운다
      alert('비밀번호를 변경했습니다');
      navigate("/");
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      vCurrentPassword.reset();
      vNewPassword.reset();
      vConfirmPassword.reset();
    }

  }

  return (
    <div style={{height:400}}>
      <TextField label='기존 비밀번호' type='password' {...vCurrentPassword} />
      <TextField label='새 비밀번호' type='password' {...vNewPassword} />
      <TextField label='새 비밀번호 확인' type='password' {...vConfirmPassword} />
      {status===AsyncStatus.FAIL && <Alert variant='danger'>실패</Alert>}
      <BlockButton label={status===AsyncStatus.SUBMITTING? "변경 중":"비밀번호 변경"}
        onClick={doChangePassword} disabled={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberChangePassword