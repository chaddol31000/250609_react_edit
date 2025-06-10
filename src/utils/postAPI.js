import api from "./api";

// fetcher : useSWR 이 데이터를 읽어오기 위해 실행할 함수로, then 까지 있어야 한다
export const readAll = (pageno)=>api.get(`/posts?pageno=${pageno}`).then(res=>res.data);

export const read =(pno)=>api.get(`/posts/post?pno=${pno}`).then(res=>res.data);

// get 처럼 delete 도 파라미터를 querystring 으로 넘겨야한다
  // username 은 spring, password 는 1234 라면
  // post, put, patch 는 {username:'spring', password:'1234'} 객체를 만들고
  // api.post('주소', 객체)로 넘기면 객체가 json 으로 넘어간다
  // api.post('주소', newURLSearchParams(객체)) 로 넘기면 객체가 urlencoded 형식으로 넘어간다
  // get, delete 는 위처럼 넘기면 안됨
    // api.delete(`주소?username=spring&password=1234`)와 같은 주소에 파라미터를 담아서 (quertstring) 전달한다
export const erase=(pno)=>api.delete(`/posts/post?pno=${pno}`);