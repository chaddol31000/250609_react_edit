import React, { useEffect, useState } from 'react'
import usePostStore from '../../stores/usePostStore';
import { readAll } from '../../utils/postAPI.js';
import Posts from '../../components/posts/Posts.jsx';
import Paginations from '../../components/posts/Paginations.jsx';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/commons/LoadingSpinner.jsx';

// 부모가 상태를 가진다 → 자식은 props 로 전달받아서 출력한다
// 상태를 외부에 저장 → 필요한 컴포넌트가 알아서 데이터를 가지고 오자


function PostList() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // store 에 저장된 posts 상태와 그 상태를 변경할 setter 함수를 가져온다
  const posts = usePostStore(state=>state.posts);
  const setPosts = usePostStore(state=>state.setPosts);
  const setPagination = usePostStore(state=>state.setPagination);

  let pageno = parseInt(params.get('pageno'));
  if(isNaN(pageno) || pageno<1)
    pageno=1;

  useEffect(()=> {
    setLoading(true);
    // 서버에서 posts 를 읽어와서 store 에 저장
    async function fetch() {
      try {
        const response = await readAll(pageno);
        // response.data 에는 start, end, next, prev, pageno, posts... 이렇게 들어있다
        // 전개 연산자를 이용해서 posts 와 나머지를 분리
          // posts 라는 애를 꺼내 나머지를 전개 연산자로 꺼내서 분리! 
          // rest 에는 posts 를 제외한 나머지가 들어있음
        const {posts, ...rest} = response.data;
        setPosts(posts);
        setPagination(rest);
      } catch(err) {
        setError(err.message);
        console.log(err);
      }finally {
        setLoading(false);
      }
    }
    fetch();
  },[pageno]);
  // 여기서 의존성 배열에 pagination 을 넣으면
  // 가상 dom 에서는 무한루프로 계속 돌아가고 진짜 dom 에서는 화면이 갱신되지 않는다
  // 그래서 pageno를 넣어야한다?

  // 여기서 실행된 posts 는 null
  // console.log(posts);

  // useEffect 에서 비동기로 읽어오기에 시간이 걸리기 때문에 다른 게 출력되는 걸 막기
  // if(posts===null) return null;

  // 여기서는 posts 에 값이 들어있어야함
  // console.log(posts);

  if(error!=='') return <div>{error}</div>
  if(loading || posts===null) return <LoadingSpinner />;
  return (
    <div>
      <Posts />
      <Paginations />
    </div>
  )
}

export default PostList