import React, { useEffect, useState } from 'react'
import { readAll } from '../../utils/postAPI.js';
import Posts from '../../components/posts/Posts.jsx';
import Paginations from '../../components/posts/Paginations.jsx';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/commons/LoadingSpinner.jsx';
import { AsyncStatus } from '../../utils/constant.js';
import { Alert } from 'react-bootstrap';
import useSWR from 'swr';

// 부모가 상태를 가진다 → 자식은 props 로 전달받아서 출력한다
// 상태를 외부에 저장 → 필요한 컴포넌트가 알아서 데이터를 가지고 오자


function PostList() {
  const [params] = useSearchParams();
  // 읽기 상태를 저장 : IDLE → loading → success 또는 fail
  const [loadingStatus, setLoadingStatus] = useState(AsyncStatus.IDLE);
  // store 에 저장된 posts 상태와 그 상태를 변경할 setter 함수를 가져온다
  let pageno = parseInt(params.get('pageno'));
  if(isNaN(pageno) || pageno<1)
    pageno=1;

  // SWR : 서버에서 데이터를 패칭하고 메모리에서 관리하는 역할
    // 읽어올 때 {data, error, isLoading} 형식으로 읽어온다
    // 데이터를 읽어올 때 isLoading 은 true
    // 데이터를 읽어오는 사이드 이펙트이므로 useEffect 를 이용해서 상태를 변경 → 그 작업을 수행해준다
  // SWR은 수신한 데이터를 메모리에 띄워두고 관리 → 기본적으로 탭을 다시 선택하면 posts 를 갱신해준다 → 비활성화
  // SWR를 이용해 서버를 갱신할 때는 pageno 가 바뀔 때마다 다시 readAll 을 이용해 갱신해라
  // 이 페이지는 데이터를 읽어올 때만 사용 가능함
  const {data, error, isLoading} = useSWR(['posts', pageno], ()=>readAll(pageno), {revalidateOnFocus:false});
  


  
  // 작업 실패했으면 리액트 부트스트랩 사용해서 서버가 응답하지 않는다는 메시지 띄우기
  if(isLoading) return <LoadingSpinner />
  if(error)  return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  // data : {posts, prev, start, end, next, pageno} 에서 posts 를 posts 에, 나머지들을 rest 라는 이름으로
  const {posts, ...pagination} = data;
  console.log(data);
  console.log(posts);
  console.log(pagination);

  
  return (
    <div>
      <Posts posts={posts}/>
      <Paginations pagination={pagination} />
    </div>
  )
}

export default PostList