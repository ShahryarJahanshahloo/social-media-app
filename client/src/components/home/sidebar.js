import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios"

const Sidebar = (props) => {
    const username = useSelector(state => state.userReducer.username)
    const jwt = localStorage.getItem("jwt")
    const history = useHistory()

    const logoutHandler = () => {
        axios({
            method: "post",
            url: "/api/logout",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
        })
            .then(() => {
                localStorage.removeItem("jwt")
                history.push("/")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="sidebar">
            <Link to="/home">home</Link><br />
            <Link to="/bookmarks">bookmarks</Link><br />
            <Link to={"/profile/" + username}>profile</Link><br />
            <Link to="/explore">explore</Link>
            <button onClick={logoutHandler}>logout</button>
        </div>
    )
};

export default Sidebar