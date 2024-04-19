import Join from './register/Join';
import Login from './login/Login';
import Main from './mainmenu/Main';
import MyPage from './mypage/MyPage';
import Cafe from './register-cafe/Cafe'
import CafeList from './cafeList/CafeList';
import ReservationList from './reservation-list/ReservationList';
import CafeReservation from './cafe-reservation/CafeReservation';
import Error from './error/Error';
import MyCafe from './my-cafe/MyCafe';
import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Header from "./layout/Header";

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <LoginContextProvider>
                        <Routes>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/join" element={<Join/>}></Route>
                            <Route path="/" element={<Main/>}></Route>
                            <Route path="/mypage" element={<MyPage/>}></Route>
                            <Route path="/cafe" element={<Cafe/>}></Route>
                            <Route path="/list" element={<CafeList/>}></Route>
                            <Route path="/reservationlist" element={<ReservationList />}></Route>
                            <Route path="/cafereservation" element={<CafeReservation />}></Route>
                            <Route path="/mycafe" element={<MyCafe />}></Route>
                            <Route path="*" element={<Error />}></Route>
                        </Routes>
                </LoginContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;