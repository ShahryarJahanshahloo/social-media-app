import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios"

import {
    FiHome as HomeIcon,
    FiSearch as ExploreIcon,
} from "react-icons/fi"
import {
    CgBookmark as BookmarkIcon,
    CgProfile as ProfileIcon,
} from "react-icons/cg"
import {
    SiTwitter as BirdIcon,
} from "react-icons/si"

const Navbar = (props) => {

    const user = useSelector(state => state.userReducer)
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

    const iconStyle = {
        fontSize: "1.6em",
        color: "black",
    }

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <div className="navbar-upper">
                    <div className="navbar-item-wrapper">
                        <div className="navbar-item" onClick={() => {history.push("/home")}}>
                            <HomeIcon style={iconStyle} />
                            <label className="navbar-item-text">Home</label>
                        </div>
                    </div>
                    <div className="navbar-item-wrapper">
                        <div className="navbar-item" onClick={() => {history.push("/bookmarks")}}>
                            <BookmarkIcon style={iconStyle} />
                            <label className="navbar-item-text">Bookmarks</label>
                        </div>
                    </div>
                    <div className="navbar-item-wrapper">
                        <div className="navbar-item" onClick={() => {history.push("/explore")}}>
                            <ExploreIcon style={iconStyle} />
                            <label className="navbar-item-text">Explore</label>
                        </div>
                    </div>
                    <div className="navbar-item-wrapper">
                        <div className="navbar-item" onClick={() => {history.push(`/profile/${user.username}`)}}>
                            <ProfileIcon style={iconStyle} />
                            <label className="navbar-item-text">Profile</label>
                        </div>
                    </div>
                </div>
                <div className="navbar-bottom">
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar