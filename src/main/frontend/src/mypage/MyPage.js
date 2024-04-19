import React, {useState, useEffect, useContext} from "react";
import "./MyPage.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginContextConsumer from "../contexts/LoginContextConsumer";
import {LoginContext} from "../contexts/LoginContextProvider";


function MyPage() {

    const {isLogin, logout, userInfo, myCafe, reservationlist} = useContext(LoginContext);



    return (
        <div className="mypage-container">
            <h2>My Page</h2>

            {
                isLogin
                    ?
                    <div>

                        <div className="user-info">
                            <p><strong>Name: {userInfo.nickname} </strong></p>
                            <p><strong>Email: {userInfo.email}</strong></p>
                        </div>
                        <div className="cafe-list">
                            <button onClick={ ()=> myCafe()}>My Cafés</button>

                        </div>
                        <div className="reservation-list">
                            <button onClick={ ()=> reservationlist()}>My Reservations</button>
                        </div>

                        <div className="logout">
                            <button type="button" onClick={() => logout()}>logout</button>
                        </div>

                    </div>
                    :
                    <div className="logout">
                        <button type="button" onClick={() => logout()}>login</button>
                    </div>


            }

        </div>


    )
}

export default MyPage;