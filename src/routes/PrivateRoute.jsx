// 로그인 하면 접근이 가능하게

import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore"

function PrivateRoute({element}) {
  const username = useAuthStore(state=>state.username);
  
  // 로그인이 아직 확인되지 않았다면 종료
  // 로그인이 확인되면 store 가 갱신되고, 현재 PrivateRoute 는 username 을 구독하고 있기 때문에 재렌더링된다
  // store 에 저장된 상태가 갱신되면 그 상태를 구독중인 컴포넌트들도 자동으로 갱신된다
  if(username===undefined)
    return;
  return username? <Navigate to="/member/login" />:element;
}

export default PrivateRoute