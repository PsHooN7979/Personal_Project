import api from './api';

// 로그인
export const login = (username, password) => api.post(`http://localhost:8899/login?username=${username}&password=${password}`)

// 사용자 정보
export const info = () => api.get(`http://localhost:8899/user/info`)

// 회원 가입
export const join = (data) => api.post(`http://localhost:8899/user/register`,data)

// 회원 정보 수정
export const update = (data) => api.put(`http://localhost:8899/user`,data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`http://localhost:8899/user/${userId}`)

//각 회원이 등록한 카페 목록
// export const cafeJoin = (data) => api.post(`http://localhost:8899/user/registercafe`, data)

// 등록된 카페 리스트
export const cafeList = () => api.get(`http://localhost:8899/user/cafelist`)

// 사용자가 등록한 카페 리스트
export const myCafeList = (owner) => api.get(`http://localhost:8899/user/cafelist?owner=${owner}`)

// 사용자가 입력한 예약정보
export const cafeReservation =(data) => api.post(`http://localhost:8899/user/reservation`,data)

// 사용자가 예약한 리스트
export const reservationList = (idx) => api.get(`http://localhost:8899/user/reservation-list?idx=${idx}`)