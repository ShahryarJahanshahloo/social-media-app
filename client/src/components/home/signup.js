import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
import { useDispatch } from 'react-redux';

const Signup = (props) => {

    let history = useHistory()
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [displayName, setDisplayName] = useState(null)
    const [password, setPassword] = useState(null)
    const [password2, setPassword2] = useState(null)
    const dispatch = useDispatch()


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
                dispatch({
                    type: "updateLoginStatus"
                })
                dispatch({
                    type: "setUser",
                    payload: {
                      username: res.data.username,
                      displayName: res.data.displayName,
                    }
                  })
                localStorage.setItem("jwt", res.data.token)
                history.push("/home")
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
        <div className="login-box-container">
            <div className="login-box signup">
                <label className="topic">Sign Up</label>

                <div className="form">
                    <input type="text" onChange={onEmailChange} placeholder="Email" />
                    <input type="text" onChange={onUsernameChange} placeholder="Username" />
                    <input type="text" onChange={onDisplayNameChange} placeholder="Display Name" />
                    <input type="text" onChange={onPasswordChange} placeholder="Password" />
                    <input type="text" onChange={onPassword2Change} placeholder="Repeat Password" />
                    <input type="submit" value="create account" onClick={handleSignup} />
                </div>

                <div className="signup-link">
                    <label onClick={handleRedirectClick}>already have an account? </label>
                </div>
            </div>
        </div>
    )
};

export default Signup;