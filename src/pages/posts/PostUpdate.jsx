import React, { useState } from 'react'
import { AsyncStatus } from '../../utils/constant'
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

function PostUpdate() {
  // 훅 들 쭉 나열할 때 중간에 if 문 같은 거 있으면 에러남
  // 1. 필요한 기능
  const [status, setStatus] = useState (AsyncStatus.IDLE);
  const vTitle = useInput();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const username = useAuthStore(state=>state.username);

  const isSubmitting =status===AsyncStatus.SUBMITTING;
  const doUpdate=async()=> {
    if(isSubmitting) return;
    setStatus(AsyncStatus.SUBMITTING);
    
    if(!(vTitle.onBlur())) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const requestForm = { title:vTitle.value, content: content, pno: pno };
      await doUpdate(requestForm);
      alert('글 수정이 완료되었습니다.')
      navigate(`/post/read?pno=${pno}`);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      console.log(err);
      setStatus(AsyncStatus.FAIL);
    }
  }

      // 2. pno 꺼내서 읽어오기
    const [params] = useSearchParams();
    const pno = parseInt(params.get('pno'));
    const { data, error, isLoading } = useSWR(['post', pno], () => read(pno));

    useEffect(() => {
        // 의존성 배열은 []만 주면 처음에 한번만 실행된다
        // 이 경우에는 아직 data가 도착하지 않았을 수 있다. => 의존성배열에 데이터 줘야해
        // 서버에서 데이터를 읽어온 다음 출력하려면 의존성 배열에 [data] 라고 지정해야 한다. 
        // [data]라고 지정하면 1. data가 null, 2. data가 도착 ... 이렇게 useEffect가 2번 실행된다. 
        // 여기에서 data가 null일 때 data.title, data.content처럼 객체의 필드, 속성 등에 접근하는걸 막아야해(값이 안왔기 때문에 접근하면 에러나니까)
        if (data) {
            vTitle.setValue(data.title);
            setContent(data.content);
        }
    }, [data]);
    // useEffect는 두번 실행될거야. 
    // 처음에 실행될 땐 데이터 세팅이 안되어있고 나중에 데이터가 날아오면 의존성배열에 data 넣었으니까 data오면 한번 더 실행됨

    // 조건부 렌더링: 잘못된 글번호, 로딩중, 읽기 실패, 글작성자가아님
    if (!pno) return <Navigate to='/' />
    if (isLoading) return <LoadingSpinner />
    if (error) return <Alert variant='danger'>글을 찾을 수 없습니다. </Alert>
    if (data.writer !== username) return <Navigate to='/' />

    return (
        <div>
            <TextField label='제목' name='title' {...vTitle} />
            <ReactQuill modules={modules} theme='snow' className='content' value={content} onChange={value => setContent(value)} />
            <BlockButton label={isSubmitting ? '변경중' : '글변경'} onClick={doUpdate} styleName='primary' disabled={isSubmitting} />

        </div>
    )
}

export default PostUpdate