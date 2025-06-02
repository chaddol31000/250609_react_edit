import api from "./api";

export const readAll = (pageno)=>api.get(`/posts?pageno=${pageno}`);