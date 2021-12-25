import React from 'react';

import UserCompact from './userCompact';

const FollowSuggestion = (props) => {


    return (
        <div className="follow-suggestion-container">
            <div className='about-me'>
                <div className='suggestion-title'>
                    <span>About me</span>
                    avatar im shahryar jahanshahloo,
                    CE student @tabriz university.
                    im currently learning
                    nodejs and react.

                    cityIcon tehran/iran
                    emailIcon shahryar.jahanshahloo@gmail.com
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