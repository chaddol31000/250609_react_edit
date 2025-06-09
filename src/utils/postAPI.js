import api from "./api";

// fetcher : useSWR 이 데이터를 읽어오기 위해 실행할 함수로, then 까지 있어야 한다
export const readAll = (pageno)=>api.get(`/posts?pageno=${pageno}`).then(res=>res.data);