import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../contexts/LoginContextProvider";
import './ReservationList.css';

const ReservationList = () => {

    const {reservationList, userInfo, reservations} = useContext(LoginContext);

    useEffect(() => {
        if (userInfo && userInfo.idx) {
            reservationList(userInfo.idx)
        }
    }, [userInfo]);

    // reservations에 값이 들어올때까지 대기
    if (!reservations || reservations.length === 0) {
        return <div className="reservation-list-container">Login please ...</div>;
    }
    else{
        console.log(reservations)
    }

    return (
        <div className="reservation-list-container">
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.idx}>{reservation.cafeName} - {reservation.cafeAddress} - {reservation.startDate} - {reservation.endDate}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReservationList;