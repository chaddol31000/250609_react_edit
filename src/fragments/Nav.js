import { Link } from "react-router-dom"

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to ="/member/signup">회원 가입</Link></li>
      </ul>
    </nav>
  )
}

export default Nav