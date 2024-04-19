import './Main.css';
import React, {useContext, useEffect} from "react";
import axios from "axios";
import LoginContextConsumer from "../contexts/LoginContextConsumer";
import {LoginContext} from "../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";
import { FixedSizeList } from 'react-window';

function Main() {

    const {cafeList, cafes, reservationClick,reservationList, userInfo, reservations} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
            cafeList()
            console.log(cafes)
        if (userInfo && userInfo.idx){
            reservationList(userInfo.idx)
            console.log(reservations)

        }
    }, [userInfo]);


    const handleReservationClick = (cafe) => {
        if (userInfo && userInfo.idx){
            reservationClick(cafe)
        }else {
            alert("Login please ...")
            navigate("/login")
        }
    }





    return (
        <div className="main-container">
            <div className="content">
                <div className="content-box">
                    <h2>Find Cafe</h2>
                    <div className="map-section">
                        <ul>
                            {cafes.map(cafe => (
                                <li key={cafe.idx}>{cafe.name} - {cafe.address} - {cafe.openTime} - {cafe.closeTime}
                                    <button className="reservation-btn" onClick={() => handleReservationClick(cafe)}>예약</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="list-box">
                    <h2>Reservation list</h2>
                    <div className="list-section">
                        <ul>
                            {reservations.map(reservation => (
                                <li key={reservation.idx}>{reservation.cafeName} - {reservation.cafeAddress} - {reservation.startDate} - {reservation.endDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Main;