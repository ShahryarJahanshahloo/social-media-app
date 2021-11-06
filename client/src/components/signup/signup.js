import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"

const Signup = (props) => {

    let history = useHistory()
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [displayName, setDisplayName] = useState(null)
    const [password, setPassword] = useState(null)
    const [password2, setPassword2] = useState(null)


    const handleRedirectClick = () => {
        history.push("/login")
    }

    const handleSignup = () => {
        axios.post("/api/sign-up", {
            email,
            username,
            displayName,
            password,
        })
            .then((res) => {
                history.push("/home")
                localStorage.setItem("jwt", res.data.token)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onDisplayNameChange = (e) => {
        setDisplayName(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onPassword2Change = (e) => {
        setPassword2(e.target.value)
    }


    return (
        <div>
            <label>Email </label>
            <input type="text" onChange={onEmailChange} /><br />

            <label>Username </label>
            <input type="text" onChange={onUsernameChange} /><br />

            <label>Display Name </label>
            <input type="text" onChange={onDisplayNameChange} /><br />

            <label>Password </label>
            <input type="text" onChange={onPasswordChange} /><br />

            <label>Repeat Password </label>
            <input type="text" onChange={onPassword2Change} /><br />

            <input type="submit" value="create account" onClick={handleSignup} />
            <label onClick={handleRedirectClick}>already have an account? </label>
        </div>
    )
};

export default Signup;