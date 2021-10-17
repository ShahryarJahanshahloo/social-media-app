import React from 'react';
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory()

    const handleRedirectClick = () => {
        history.push("/signup")
    }

    const handleLogin = () => {
        history.push("/home")
    }

    return (
        <>
            <label>Email </label>
            <input type="text"/><br/>
            <label>Password </label>
            <input type="text"/><br/>
            <input type="submit" value="login" onClick={handleLogin}/>
            <label onClick={handleRedirectClick}>dont have an account? </label>
        </>
    )
};

export default Login;