import React, {useContext, useEffect} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Login.css';
import axios from "axios";
import {redirect} from "react-router-dom";
import Session from "react-session-api";
import {LoginContext} from "../contexts/LoginContextProvider";
import TextField from '@mui/material/TextField';


function Login() {


    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const { login } = useContext(LoginContext)

    const onLogin = (e) => {
        e.preventDefault();
        login(username, password)
    }


    return (
        <div>
            <div className="login-container">
                <div className="login">
                    <form className="login-form" action="login" method="post" onSubmit={ (e) => onLogin(e)}>
                        <div className="form-group">
                            <div className="input-block">
                                <TextField type="text" name="username" className="input" id="username" label="ID" fullWidth
                                       onChange={(event) =>
                                           setUsername(event.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <TextField type="password" name="password"  className="input" id="password" label="Password" fullWidth
                                       onChange={(event) =>
                                           setPassword(event.target.value)} required/>
                            </div>
                        </div>



                        <button type="submit" className="login-submit-btn" >로그인</button>
                        <div>
                            <p>계정이 없으신가요? > <a href="http://localhost:3000/join">회원가입</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;