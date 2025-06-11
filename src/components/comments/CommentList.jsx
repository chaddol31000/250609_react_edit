// 댓글들을 출력 + 자신이 작성한 댓글인 경우 삭제 버튼을 출력

import useComment from "../../hooks/useComment";
import useAuthStore from "../../stores/useAuthStore"

function CommentList({comments}) {
  const username = useAuthStore(state=>state.username);
  const {onDelete} = useComment();

  return (
    <div>
      {
        comments.map(c=> {
          return (
            <div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                  <strong>{c.writer}</strong>&nbsp; &nbsp;
                  {
                    (c.writer===username) && <button className="btn btn-danger" onClick={()=>onDelete(c.cno, c.pno)}>삭제</button>
                  }
                </div>
              </div>
              <div>{c.writeTime}</div>
              <div>
                {c.content}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CommentList