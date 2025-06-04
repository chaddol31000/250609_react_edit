// 이메일로 아이디 찾기

import { useState } from "react";
import { AsyncStatus } from "../../utils/constant";
import useEmail from "../../hooks/useEmail";
import { Alert } from "react-bootstrap";
import TextField from "../commons/TextField";
import BlockButton from "../commons/BlockButton";
import { findUsername } from "../../utils/memberAPI";

function MemberFindUsername() {
  const vEmail = useEmail();
  const [submittingStatus, setSubmittingStatus] = useState(AsyncStatus.IDLE);
  const [username, setUsername] = useState('');

  const doFindUsername=async()=> {
    setUsername('');
    setSubmittingStatus(AsyncStatus.SUBMITTING);

    if(!vEmail.onBlur()) {
      setSubmittingStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const response = await findUsername(vEmail.value);
      setUsername(response.data);
      setSubmittingStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setSubmittingStatus(AsyncStatus.FAIL);
      console.log(err);
    }



  }

  // 예를 들어 아이디를 찾아서 출력했다고 하자
  // 그 상태에서 이메일을 새로 입력해
  
  const onBlur =()=> {
    // 현재 출력된 결과를 지운 다음 이메일을 검증한다
    // 그래서 한 번에 못 넘기고 풀어 헤쳐서 넘겨야함
    setSubmittingStatus(AsyncStatus.IDLE);
    setUsername('');
    vEmail.onBlur();
  }

  return (
    <div>
      {submittingStatus===AsyncStatus.SUCCESS && <Alert variant="success">당신의 아이디 : {username}</Alert>}
      {submittingStatus===AsyncStatus.FAIL && <Alert variant="danger">아이디를 찾지 못했습니다</Alert>}
      <TextField label="이메일" name='email' message={vEmail.message} onChange={vEmail.onChange} onBlur={onBlur} />
      <BlockButton label={submittingStatus===AsyncStatus.SUBMITTING? "검색 중":"아이디 찾기"}
        onClick={doFindUsername} styleName='dark' disabled={submittingStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberFindUsername