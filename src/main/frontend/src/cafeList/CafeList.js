import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import './CafeList.css';
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../contexts/LoginContextProvider";


function CafeList() {

    const {cafeList, cafes, reservationClick, userInfo} = useContext(LoginContext)
    const navigate = useNavigate(); // hook to navigate programmatically


    console.log(cafes)

    useEffect(() => {
        cafeList()
        console.log(cafes)
    }, []);

    const handleReservationClick = (cafe) => {
        if (userInfo && userInfo.idx){
            reservationClick(cafe)
        }else {
            alert("Login please ...")
            navigate("/login")
        }
    }



    return (
        <div className="cafelist-container">
            <h2>Café List</h2>
            <ul>
                {cafes.map(cafe => (
                    <li key={cafe.idx}>{cafe.name} - {cafe.address} - {cafe.openTime} - {cafe.closeTime}

                        <button className="reservation-btn" onClick={() => handleReservationClick(cafe)}>예약</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CafeList;