import React from "react"

import Avatar from "./avatar"

const TitleBar = () => {


    return (
        <div className="title-bar">
            <div className="title-bar-flex">
                <div className="avatar-box">
                    <Avatar />
                </div>
                <div className="title-box">
                    <p>Home</p>
                </div>
            </div>
        </div>
    )
}

export default TitleBar