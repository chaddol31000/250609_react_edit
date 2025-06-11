import React from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../../components/commons/LoadingSpinner';
import { Alert, Button } from 'react-bootstrap';
import useAuthStore from '../../stores/useAuthStore';
import useSWR from 'swr';
import { erase, read } from '../../utils/postAPI';
import DOMPurify from 'dompurify';
import CommentWrite from '../../components/comments/CommentWrite';
import CommentList from '../../components/comments/CommentList';

function PostRead() {
  // 1. 필요한 기능 가져오기
  const navigate = useNavigate();
  const username = useAuthStore(state=>state.username);


  // 2. pno 파라미터로 post를 fetch(swr)
  const [params] = useSearchParams();
  const pno = parseInt(params.get('pno'));

  // 글을 읽어 와서 post 란 이름으로 캐시하라
    // pno 가 바뀌면 캐시를 갱신해라
  const {data, error, isLoading} = useSWR(['post', pno], ()=>read(pno), {revalidateOnFocus: false});


  // 리액트의 컴포넌트 기능은 렌더링 (return JSX) + 기타(side effect, 부가 효과)
    // 렌더링에 영향을 주는 side effect (상태를 변경, 화면을 변경) 가 렌더링 도중에 실행되어서는 안된다 → 무한 재렌더링 발생
    // 그럼 어디서 실행하느냐? useEffect (왜? useEffect 가 side Effect 를 관리하는 곳이기 때문) 또는 이벤트 핸들러
      // 왜? useEffect 와 이벤트 핸들러 코드는 화면 렌더링이 끝난 다음에 실행된다는 것을 보장한다
    // 그래서 아래처럼 코드를 짜면 안되고 useEffect 로 들어가야함
      // if(isNaN(pno))
      //   navigate("/")
    // 하지만 조건부 렌더링을 사용하면 useEffect 를 사용할 필요가 없음
    // useEffect 나 이벤트 핸들러를 사용하면 훅을 사용함


  // 3. 로그인 여부, 작성자 여부 확인
    // 로그인 여부 : 댓글 작성이 보인다
    // 로그인 여부 && 작성자 여부 : 글 작성자면 변경, 삭제 가능
      // ㄴ 글 작성자가 아니면 추천이 보이게
  const isLogin = username!==undefined && username!=null;
  const isWriter = data && username && data.writer===username;


  // 4. 삭제 핸들러
    // 여기는 이벤트 핸들러이기 때문에 네비게이트 훅을 사용하면 됨
  const doDeletePost=()=>erase(pno).then(()=>navigate('/')).catch(()=>alert('삭제하지 못했습니다'));


  // 5. 조건부 렌더링
  if(isNaN(pno)) return <Navigate to="/" />
  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>선택하신 글이 존재하지 않습니다.</Alert>

  console.log(data);
  return (
    <div>
      <div className='read-title mb-2'>{data.title}</div>
      {/* 부모에 flex 를 주면 자식들의 배치 방법을 지정할 수 있다 */}
      <div className='mb-3' style={{display:'flex', justifyContent:'space-between'}} >
        <div>
          <span>{data.writer}</span>
          <span>|</span>
          <span>글번호</span>
          <span>{data.bno}</span>
          <span>|</span>
          <span>조회</span>
          <span>{data.readCnt}</span>
          <span>|</span>
          <span>추천</span>
          <span>{data.goodCnt}</span>
        </div>
        { (isLogin && !isWriter) && <button>좋아요</button>}
      </div>
      {/*
        자바스크립트에서 innerText='<b>안녕</b>' → <b>안녕</b>        html 이 적용되지 않는다 (안전)
                        innerText='<script>('안녕')</script>'   → html 을 글자로 취급해서 그대로 화면에 출력
        그런데 innerHTML 을 사용하면 html 이 적용된다. 그래서 <script>도 적용되어 js 가 실행된다 → 위험하다

        보통 웹의 최대 위협 중 하나가 XSS (교차 사이트 스크립트).
          XSS : 글에 포함된 JS 가 실행

        리액트에서 innerHTML 을 대신하는 속성이 dangerouslySetInnerHTML → 이름이 강력한 경고 (조심해서 써라?)

      */}
      <div style={{minHeight:600, backgroundColor:'#f1f1f1', padding:5}} 
          dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.content)}}>
      </div>
      <div>
        {
          isWriter &&
          <div>
            <Button variant='success'>변경으로</Button>
            <Button variant='danger' onClick={doDeletePost}>삭제하기</Button>
          </div>
        }
      </div>
      <div className='mb-3 mt-3'>
        {isLogin && <CommentWrite pno={pno} />}
        <CommentList comments={data.comments} />
      </div>
    </div>
  )
}

export default PostRead