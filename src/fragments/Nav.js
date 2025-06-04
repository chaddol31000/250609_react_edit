import { Link } from "react-router-dom"
import useAuthStore from "../stores/useAuthStore"
import { logout } from "../utils/memberAPI";

function Nav() {
  const username = useAuthStore(state=>state.username);
  const resetUsername = useAuthStore(state=>state.resetUsername);

  const doLogout=async()=> {
    try {
      await logout();
      resetUsername();
    } catch(err) {
      console.log(err);
    }
  }

  if(username) {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post/write">글쓰기</Link></li>
          <li><Link to="/member/read">내 정보</Link></li>
          <li><Link to="#" onClick={doLogout}>로그아웃</Link></li>
        </ul>
    </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/member/signup">회원 가입</Link></li>
          <li><Link to="/member/login">로그인</Link></li>
          <li><Link to="/member/find-username">아이디 찾기</Link></li>
        </ul>
      </nav>
    )
  }

}

export default Nav