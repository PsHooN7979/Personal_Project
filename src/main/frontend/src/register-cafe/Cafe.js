import './Cafe.css';
import {useContext, useState} from "react";
import axios from "axios";
import Session from 'react-session-api';
import {LoginContext} from "../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';


function Cafe() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [tableCount, setTableCount] = useState('');
    const {userInfo} = useContext(LoginContext)
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();

        if (userInfo && userInfo.idx) {
            axios
                .post("http://localhost:8899/user/registercafe",
                    {
                        name: name,
                        address: address,
                        openTime: openTime,
                        closeTime: closeTime,
                        tableNum: tableCount,
                        owner: userInfo.idx,

                    })
                .then((res) => {
                    console.log(res.data);
                    navigate("/list")

                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            alert("Login please ...")
            navigate("/login")
        }


    }


    return (
        <div className="registration-container">
            <h2>Register Your Cafe</h2>
            <form id="cafe-registration-form" method="post" action="registerCafe" onSubmit={handleRegister}>
                <div className="form-group">
                    <TextField type="text" id="cafeName" name="cafeName" label="Cafe Name" fullWidth
                               onChange={(event) =>
                                   setName(event.target.value)} required/>
                </div>
                <div className="form-group">
                    {/*<label htmlFor="location">Location:</label>*/}
                    <TextField type="text" id="location" name="location" label="Location" fullWidth
                               onChange={(event) =>
                                   setAddress(event.target.value)} required/>
                </div>
                <div className="form-group">
                    <TextField type="time" id="openingTime" name="openingTime" label="Open Time" fullWidth
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               onChange={(event) =>
                                   setOpenTime(event.target.value)} required/>
                </div>
                <div className="form-group">
                    <TextField type="time" id="closingTime" name="closingTime"  label="Close Time" fullWidth
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               onChange={(event) =>
                                   setCloseTime(event.target.value)} required/>
                </div>
                <div className="form-group">
                    <TextField type="number" id="tableCount" name="tableCount" label="Table Count" fullWidth
                               onChange={(event) =>
                                   setTableCount(event.target.value)} required/>
                </div>
                <button type="submit" className="register-btn">Submit</button>
            </form>
        </div>
    )
}

export default Cafe;