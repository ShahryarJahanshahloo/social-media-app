import React from "react"
import { useHistory } from "react-router"
import { useSelector } from 'react-redux';

import Avatar from "./avatar"

import {
    AiFillEdit as ComposeIcon,
} from "react-icons/ai"

const iconStyle = {
    fontSize: "1.6em",
    color: "rgb(29, 155, 240)"
}

const TitleBar = ({ title = "Home", composeDisplay = "block" }) => {
    const history = useHistory()
    const username = useSelector(state => state.userReducer.username)

    const composeHandler = () => {
        history.push("/compose")
    }

    return (
        <div className="title-bar">
            <div className="title-bar-flex">
                <div className="title-bar-flex-item-side">
                    <div className="avatar-box">
                        <Avatar username={username} size="32" />
                    </div>
                </div>
                <div className="title-bar-flex-item-middle">
                    <div className="title-box">
                        {title}
                    </div>
                </div>
                <div className="title-bar-flex-item-side">
                    <div className="composeIcon" onClick={composeHandler}>
                        <ComposeIcon style={{...iconStyle, display: composeDisplay}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleBar