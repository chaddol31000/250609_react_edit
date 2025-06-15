import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { AsyncStatus } from '../../utils/constant'
import { mutate } from 'swr';
import { good } from '../../utils/postAPI';

// UI는 컴포넌트로, 동작은 커스텀훅으로 분리 vs UI와 동작을 단일컴포넌트로 분리
// 전자: 아이디, 비밀번호, 이메일 만든거
// 후자: GoodButton

// 좋아요 코드가 길어서 따로 뺌. 재활용하려던건 아님

// 추천은 부모에게 있으니까 추천수 받아올거고 현재 글 추천수 출력할거라? pno 가져와야해
function GoodButton({ pno, goodCnt }) {
    // 버튼 눌렀으면 비활성화하게할거야 => 상태 있어야해
    // 지금 밑 status는 서버로 보내는 작업 상태를 저장해서 '작업중'이라고 글자를 바꿔주거나 작업중일 때 버튼을 다시 클릭하면 재실행을 막아주는 목적으로 실행
    const [status, setStatus] = useState(AsyncStatus.IDLE);

    const doGood = async () => {
        if (status === AsyncStatus.SUBMITTING) return;  // 이미 작업이 실행중이면 작업을 멈춰라
        setStatus(AsyncStatus.SUBMITTING); // 실행중이 아니라면 상태를 실행중으로 바꿔라

        try {
            // 글을 추천하면 서버는 새로운 추천수를 리턴
            const response = await good(pno);
            mutate(['post', pno], prev => {
                if (!prev)
                    return prev;
                return { ...prev, goodCnt: response.data };
            })
            setStatus(AsyncStatus.SUCCESS);  // 작업 성공했으면 상태를 성공으로 바꿔라
        } catch (err) {
            console.log(err);
            setStatus(AsyncStatus.FAIL);  // 작업 실패했으면 상태를 실패로 바꿔라 (이렇게 상태 저장해두는게 좋아~)
        }
    }

    return (
        <Button variant='primary' onClick={doGood} disabled={status === AsyncStatus.SUBMITTING}>
            추천 <Badge bg='secondary'>{goodCnt}</Badge>
        </Button>
    )
}

export default GoodButton