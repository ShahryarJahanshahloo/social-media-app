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

const Sidebar = (props) => {
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
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <div className="sidebar-upper">
                    <div className="sidebar-item-wrapper">
                        <HomeIcon style={iconStyle}/>
                        <Link className="sidebar-item" to="/home">Home</Link>
                    </div>
                    <div className="sidebar-item-wrapper">
                        <BookmarkIcon style={iconStyle}/>
                        <Link className="sidebar-item" to="/bookmarks">Bookmarks</Link>
                    </div>
                    <div className="sidebar-item-wrapper">
                        <ProfileIcon style={iconStyle}/>
                        <Link className="sidebar-item" to={`profile/${user.username}`}>Profile</Link>
                    </div>
                    <div className="sidebar-item-wrapper">
                        <ExploreIcon style={iconStyle}/>
                        <Link className="sidebar-item" to="/explore">Explore</Link>
                    </div>
                </div>
                <div className="sidebar-bottom">
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar