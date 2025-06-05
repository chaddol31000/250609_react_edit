import api from "./api";

export const idAvailableCheck = (username) => api.get(`/api/members/check-username?username=${username}`)

export const signup = (formData) => api.post(`/api/members/new`, formData);

export const findUsername =(email)=> api.get(`/api/members/username?email=${email}`);

export const findPassword =(username)=> api.put(`/api/members/password?username=${username}`);

export const checkPassword=(password)=> api.get(`/api/members/password?password=${password}`);

// username 과 password 를 urlencoded 방식으로 보낸다
// urlencoding 방식으로 보내려면 URLSearchParams 객체를 생성해야한다
export const login = (object) => api.post(`/login`, new URLSearchParams(object));

export const logout = () => api.post(`/logout`);