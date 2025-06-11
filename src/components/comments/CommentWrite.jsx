import React from 'react'
import useComment from '../../hooks/useComment'
import BlockButton from '../commons/BlockButton';

function CommentWrite({pno}) {
  // vComment를 왜 부모에다 안 만들고 여기다 만들었나?
    // 
  const vc = useComment();

  return (
    <div>
      <label htmlFor='content' className='form-label'>댓글 작성:</label>
      <textarea className='form-control' placeholder={vc.message} onChange={vc.onChange} value={vc.value} onBlur={vc.onBlur}></textarea>
      <BlockButton styleName='primary' onClick={()=>vc.onWrite(pno)} label="작성하기" />
    </div>
  )
}

export default CommentWrite