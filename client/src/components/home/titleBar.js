import React from "react"

import Avatar from "./avatar"

import myAvatar from "../../bull.jpg"

const TitleBar = () => {

    return (
        <div className="title-bar">
            <div className="title-bar-flex">
                <div className="avatar-box">
                    <Avatar img={myAvatar} size="32"/>
                </div>
                <div className="title-box">
                    <p>Home</p>
                </div>
            </div>
        </div>
    )
}

export default TitleBar