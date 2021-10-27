import React , {useRef} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios"

const Login = (props) => {
    let history = useHistory()
    const emailInput = useRef(null)
    const passwordInput = useRef(null)

    const handleRedirectClick = () => {
        history.push("/signup")
    }

    const handleLogin = () => {
        axios.post("/api/sign-in", {
            email: emailInput.current.value,
            password: passwordInput.current.value
        })
        .then((res) => {
            localStorage.setItem("jwt" , res.data.token)
            history.push("/home")
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
            <label>Email </label>
            <input type="text" ref={emailInput}/><br/>
            <label>Password </label>
            <input type="text" ref={passwordInput}/><br/>
            <input type="submit" value="login" onClick={handleLogin}/>
            <label onClick={handleRedirectClick}>dont have an account? </label>
        </div>
    )
};

export default Login;