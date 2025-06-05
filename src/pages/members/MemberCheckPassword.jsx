import React, { useState } from 'react'
import useMemberStore from '../../stores/useMemberStore'
import { AsyncStatus } from '../../utils/constant';
import usePassword from '../../hooks/usePassword';
import { Alert } from 'react-bootstrap';
import TextField from '../../components/commons/TextField';
import BlockButton from '../../components/commons/BlockButton';
import { checkPassword } from '../../utils/memberAPI';
import { useNavigate } from 'react-router-dom';
// 내 정보를 보려면 비밀번호 확인을 거쳐야 한다
// 비밀번호를 확인한 경우에만 내 정보를 볼 수 있다
// 비밀번호 확인 여부 : 
  // - MemberCheckPassword 저장
  // - MemberRead 에서 확인. 확인 되지 않은 경우 MemberCheckPassword 로 이동

function MemberCheckPassword() {
  const isPasswordVerified = useMemberStore(state=>state.isPasswordVerified);
  const setPasswordVerified = useMemberStore(state=>state.setPasswordVerified);
  const [submittingStatus, setSubmittingStatus] = useState(AsyncStatus.IDLE);
  const vPassword = usePassword();
  const navigate = useNavigate();

  const doCheckPassword=async()=> {
    if(submittingStatus===AsyncStatus.SUBMITTING) return;
    setSubmittingStatus(AsyncStatus.SUBMITTING);

    if(!vPassword.onBlur()) {
      setSubmittingStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      await checkPassword(vPassword.value);
      setPasswordVerified();
      setSubmittingStatus(AsyncStatus.SUCCESS);
      navigate("/member/read");
      return;
    } catch(err) {
      setSubmittingStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  return (
    <div>
      {submittingStatus===AsyncStatus.FAIL && <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <TextField label='비밀번호' name='password' type='password' {...vPassword} />
      <BlockButton label={submittingStatus===AsyncStatus.SUBMITTING? "확인 중":"확 인"}
        onClick={doCheckPassword} styleName="primary" disabled={submittingStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberCheckPassword