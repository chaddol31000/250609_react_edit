// /member/verified?result=값

import { Alert } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom"

function MemberVerified() {
  const [searchParams] = useSearchParams();
  const result = searchParams.get('result');

  if(result) {
    return (
      <>      
        <Alert variant='success'>이메일 인증이 완료되었습니다</Alert>
        <Link to="/member/login">로그인으로</Link>
      </>
    )
  } else {
    return (
      <Alert variant='danger'>이메일 인증이 실패했습니다. 이미 인증 되었거나 잘못된 링크입니다</Alert>
    )
  }
}

export default MemberVerified