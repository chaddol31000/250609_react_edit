import api from "./api";

export const idAvailableCheck = (username) => api.get(`/api/members/check-username?username=${username}`)