import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import TweetList from './tweetList';
import Sidebar from './sidebar';

const Profile = (props) => {
    const [tweets, setTweets] = useState({ data: [{ body: "", likes: "", owner: { displayName: "", username: "" }, createdAt: "" }] })
    const profileUsername = useParams().username
    const user = useSelector(state => state.userReducer)
    const isUserProfile = (profileUsername === user.username)

    const setTweetsHandler = (response) => {
        setTweets((prevState) => {
            return { data: response.data.tweets }
        })
    }

    return (
        <div>
            {user.username}
            {profileUsername}
            {isUserProfile ? "true" : "false"}
            <Sidebar />
            <TweetList tweets={tweets.data}
                setTweetsHandler={setTweetsHandler}
                url="/api/profileTweets"
                queryUsername={profileUsername}></TweetList>
        </div>
    )
}

export default Profile;