import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios"

import {
    FiHome as HomeIcon,
    FiHash as ExploreIcon,
} from "react-icons/fi"
import {
    CgBookmark as BookmarkIcon,
    CgProfile as ProfileIcon,
} from "react-icons/cg"
import {
    FaKiwiBird as BirdIcon,
} from "react-icons/fa"

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
        fontSize: "1.6em"
    }

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <div className="navbar-upper">
                    <div className="navbar-item-wrapper">
                        <HomeIcon style={iconStyle}/>
                        <Link className="navbar-item" to="/home">Home</Link>
                    </div>
                    <div className="navbar-item-wrapper">
                        <BookmarkIcon style={iconStyle}/>
                        <Link className="navbar-item" to="/bookmarks">Bookmarks</Link>
                    </div>
                    <div className="navbar-item-wrapper">
                        <ProfileIcon style={iconStyle}/>
                        <Link className="navbar-item" to={`profile/${user.username}`}>Profile</Link>
                    </div>
                    <div className="navbar-item-wrapper">
                        <ExploreIcon style={iconStyle}/>
                        <Link className="navbar-item" to="/explore">Explore</Link>
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