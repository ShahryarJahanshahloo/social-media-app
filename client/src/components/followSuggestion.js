import React from 'react';

import UserCompact from './userCompact';
import Avatar from './avatar';

import {
    FaCity as CityIcon
} from "react-icons/fa"

import {
    AiOutlineMail as EmailIcon
} from "react-icons/ai"

const FollowSuggestion = (props) => {


    return (
        <div className="follow-suggestion-container">
            <div className='about-me'>
                <div className='suggestion-title'>
                    <span>About me</span>
                </div>
                <div className='about-me-section'>
                    <div className="avatar-box" style={{width:"60px"}}>
                        <Avatar username="mamad1234" size="48" />
                    </div>
                    <div className='about-me-title'>
                        Hi! &#128075;
                    </div>
                </div>
                <div className='about-me-section' style={{lineHeight:"30px"}}>
                    I'm Shahryar Jahanshahloo,
                    CE student @Tabriz university.
                    I'm currently learning
                    Nodejs and React.
                </div>
                <div className='about-me-section'>
                    <CityIcon />
                    <div className='about-me-info'>Tehran,Iran</div>
                </div>
                <div className='about-me-section'>
                    <EmailIcon />
                    <div className='about-me-info'>shahryar.jahanshahloo@gmail.com</div>
                </div>
            </div>

            <div className='who-to-follow'>
                <div className='suggestion-title'>
                    <span>Who to follow</span>
                </div>
                <div className='follow-list'>
                    <UserCompact userContent={{
                        username: "mamad1234",
                        displayName: "mamad",
                        bio: "",
                    }} />
                    <UserCompact userContent={{
                        username: "abbas1234",
                        displayName: "abbas",
                        bio: "",
                    }} />
                    <UserCompact userContent={{
                        username: "mamad1234",
                        displayName: "mamad",
                        bio: "",
                    }} />
                </div>
            </div>
        </div>
    )
}

export default FollowSuggestion;