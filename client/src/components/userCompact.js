import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from './avatar'

const iconStyle = {
    fontSize: "15px",
    color: "rgb(83, 100, 113)",
}

const UserCompact = ({ userContent }) => {
    const history = useHistory()
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const redirectToProfile = () => {
        history.push(`/profile/${userContent.username}`)
    }

    return (
        <div className='tweet-compact'>
            <div className="tweet-sidebar" onClick={redirectToProfile}>
                <Avatar username={userContent.username} size="48" />
            </div>
            <div className="tweet-main">
                <div className="user-author-info">
                    <div className='user-info'>
                        <div className="user-displayName" onClick={redirectToProfile}>
                            {userContent.displayName}
                        </div>
                        <div className="user-username" onClick={redirectToProfile}>
                            <label>@{userContent.username}</label>
                        </div>
                    </div>
                    <div className='follow-section'>
                        <button className='follow-btn'>follow</button>
                    </div>
                </div>
                <div className="tweet-body" onClick={redirectToProfile}>
                    {userContent.bio}
                </div>
            </div>
        </div>
    )
}

export default UserCompact;