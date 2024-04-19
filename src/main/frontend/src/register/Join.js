import React, {useEffect} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Join.css';
import axios from "axios";
import TextField from '@mui/material/TextField';


function Join() {

    const [username, setusername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nickname, setNickname] = React.useState('');


    const handleLogin = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8899/user/register", {
                username: username,
                password: password,
                email: email,
                nickname: nickname,
            })
            .then((res) => {
                console.log(res.data)
                window.location.href="http://localhost:3000/login";
            })
            .catch((error) => {
                console.log(error);
                console.log(username);
                console.log(password);
                console.log(email);
                console.log(nickname);

            })
    }


    return (
        <div>
            <div className="container">
                <div className="login">
                    <form className="login-form" action="login" method="post" onSubmit={handleLogin}>
                        <div className="form-group">
                            <div className="input-block">
                                <TextField type="text" id="username" className="input" name="username" label="ID" fullWidth
                                       onChange={(event) =>
                                           setusername(event.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <TextField type="password" id="password" className="input" name="password" label="Password" fullWidth
                                       onChange={(event) =>
                                           setPassword(event.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <TextField type="text" id="email" className="input" name="email" label="Email" fullWidth
                                       onChange={(event) =>
                                           setEmail(event.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <TextField type="text" id="nickname" className="input" name="nickname" label="Nickname" fullWidth
                                       onChange={(event) =>
                                           setNickname(event.target.value)} required/>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">회원가입</button>
                        <div>
                            <p><a href="http://localhost:3000/login">로그인</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Join;