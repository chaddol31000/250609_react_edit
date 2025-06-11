import { useState } from 'react'
import { preinitModule } from 'react-dom';
import { deleteComment, writeComment } from '../utils/postAPI';
import { mutate } from 'swr';

function useComment() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange =e=> setValue(e.target.value);

  const onBlur =()=> {
    setMessage('');
    if(value!='')
      return true;
    setMessage('필수 입력입니다.');
    return false;
  }

  // useSWR 캐시는 읽어온 글을 이름과 키로 구별한다 → ['posts', pno]
  const update=(pno, newComments)=> {
    mutate(['post', pno], (prev)=> {
      // prev 가 서버에 읽어온 post.
      // !prev = prev 가 비어있다는 뜻 즉, prev가 서버에서 도착하지 않았다
      if(!prev)
        return prev;
      return {...prev, comments: newComments};
    }, false);
    // false : mutate 로 값을 갱신시키면 swr 은 서버와 통신해서 값을 갱신한다 → 그 작업을 하지 마라
    // mutate 로 SWR 캐시를 수동 갱신 → 그 다음 SWR  은 서버와 통신해서 실제값으로 갱신한다 (낙관적 갱신)
    // 현재는 낙관적 갱신을 false 로 비활성화
  }

  const onWrite=async(pno)=> {
    const result = onBlur();
    if(!result)
      return;
    const requestForm = {pno:pno, content:value};
    try {
      const response = await writeComment(requestForm);
      // onWrite 는 댓글 작성 컴포넌트에서 실행 → 댓글들 리턴 → CommentList 컴포넌트가 갱신
      update(pno, response.data);
      setValue('');
    } catch(err) {
      console.log(err);
    }
  }

  const onDelete=async(cno, pno)=> {
    // cno, pno 순서 뒤집어지면 cno로 pno 가 사라질 수 있으니 순서 유의하기
    try {
      const response = await deleteComment(cno, pno);
      update(pno, response.data);
    } catch(err) {
      console.log(err);
    }
  }
  return {value, message, onBlur, onChange, onWrite, onDelete}
}

export default useComment