import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../contexts/LoginContextProvider";
import {useLocation, useNavigate} from "react-router-dom";
import './CafeReservation.css';
import TextField from '@mui/material/TextField';

const CafeReservation = () => {

    const location = useLocation(); // Access location object
    const navigate = useNavigate();
    const { reservation , userInfo} = useContext(LoginContext);
    const cafeInfo = { ...location.state };
    console.log(userInfo.idx)


    const handleReservation = async (event) => {
        event.preventDefault();
        const reservationData = {
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
            userIdx: userInfo.idx, // 로그인한 유저의 ID가 필요합니다. context에서 관리하거나 별도로 관리해야 합니다.
            cafeIdx: cafeInfo.idx, // cafeInfo 객체에 카페의 idx가 포함되어 있어야 합니다.
        };

        try {
            await reservation(reservationData);
            alert("Reservation successful!");
            navigate('/'); // 예약 후 이동할 경로
        } catch (error) {
            alert("Reservation failed!");
            console.error(error);
        }
    };




    return(
        <div className="reservation-container">
            <h2>Cafe Reservation</h2>
            <h3>Cafe Name : {cafeInfo.name}</h3>
            <h3>Cafe Address :{cafeInfo.address}</h3>
            <h3>Opening Hours: {cafeInfo.openTime} - {cafeInfo.closeTime}</h3>
            <h3>Table Count: {cafeInfo.tableNum}</h3>
            <form onSubmit={handleReservation}>

                <TextField
                    type="time"
                    name="startDate"
                    placeholder="Start Date and Time"
                    label="Start Time" fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    type="time"
                    name="endDate"
                    placeholder="End Date and Time"
                    label="End Time" fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <button type="submit" className="reservation-submit-btn">Reserve</button>
            </form>
        </div>
    )
}

export default CafeReservation;