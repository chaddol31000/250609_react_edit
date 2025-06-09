import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const Paginations = ({pagination}) => {
  // 1. 예를 들어 1페이지 상태에서 다음으로(6페이지)를 누르면
  // 2. store 에서 1페이지 pagination 을 읽어온다 → useEffect 가 실행된다 → 화면에 출력
  // 3. 그동안 PageList 의 useEffect 에서 6페이지의 데이터를 fetch 한다
  // 4. PageList 가 store 의 pagination 을 변경했지만 useEffect(()=>{},[]) 이므로 pagination 이 갱신되지 않음
  // 5. PageList 가 store 의 pagination 을 변경하면 자식인 Paginations 가 그 변경에 따라 useEffect를 다시 계산
    // useEffect(()=>{},[pagination])
  console.log(pagination);
  const {prev,start,end,next,pageno} = pagination;
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pageItem = [];
    // jsx 는 1부터 5까지 형식의 for 문 사용불가
    // 1부터 5까지 찍으려면 미리 [1,2,3,4,5] 배열을 만들어 놓고 map 한다

    for (let i = start; i <= end; i++) 
      pageItem.push(i);
    setPages(pageItem);
  }, [pagination]);

  const move = (pageno) => navigate(`/?pageno=${pageno}`);

  return (
    <Pagination style={{justifyContent:'center'}} className="mt-5">
      {prev > 0 && <Pagination.Item onClick={() => move(prev)}>이전으로</Pagination.Item>}
      {
        pages.map(i => (
          <Pagination.Item key={i} active={pageno === i} onClick={() => move(i)}>{i}</Pagination.Item>
        ))
      }
      {next > 0 && <Pagination.Item onClick={() => move(next)}>다음으로</Pagination.Item>}
    </Pagination>
  );
}

export default Paginations;