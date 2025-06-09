import api from "./api";

export const idAvailableCheck = (username) => api.get(`/api/members/check-username?username=${username}`)

export const signup = (formData) => api.post(`/api/members/new`, formData);

export const findUsername =(email)=> api.get(`/api/members/username?email=${email}`);

export const findPassword =(username)=> api.put(`/api/members/password?username=${username}`);

export const checkPassword=(password)=> api.get(`/api/members/password?password=${password}`);

// 우리는 결과값이 res.data 에 들어있기 때문에 then 에 res=>res.data 로 적음
export const read=()=>api.get('/api/members/member').then(res=>res.data);

export const changePassword=(object)=>api.patch(`/api/members/password`, new URLSearchParams(object));

export const changeProfile=(formData)=>api.put('/api/members/profile', formData);

// username 과 password 를 urlencoded 방식으로 보낸다
// urlencoding 방식으로 보내려면 URLSearchParams 객체를 생성해야한다
export const login = (object) => api.post(`/login`, new URLSearchParams(object));

export const logout = () => api.post(`/logout`);