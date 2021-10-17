import React from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"

const Signup = (props) => {
    let history = useHistory()

    const handleRedirectClick = () => {
        history.push("/login")
    }

    const handleSignup = () => {
        history.push("/home")
    }

    return (
        <>
            <label>Email </label>
            <input type="text" /><br />

            <label>Username </label>
            <input type="text" /><br />

            <label>Display Name </label>
            <input type="text" /><br />

            <label>Password </label>
            <input type="text" /><br />

            <label>Repeat Password </label>
            <input type="text" /><br />

            <input type="submit" value="create account" onClick={handleSignup} />
            <label onClick={handleRedirectClick}>already have an account? </label>
        </>
    )
};

export default Signup;