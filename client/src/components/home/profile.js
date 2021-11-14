import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from "axios"

import TweetList from './tweetList';
import Navbar from './navbar';
import TitleBar from './titleBar';
import FollowSuggestion from './followSuggestion';

const Profile = (props) => {
    const [skip, setSkip] = useState(0)
    const [tweets, setTweets] = useState({ data: [{ body: "", likes: "", owner: { displayName: "", username: "" }, createdAt: "" }] })
    const profileUsername = useParams().username
    const user = useSelector(state => state.userReducer)
    const isUserProfile = (profileUsername === user.username)

    const setTweetsHandler = (response) => {
        setTweets((prevState) => {
            return { data: response.data.tweets }
        })
    }

    const LoadClickHandler = () => {
        axios({
            url: "/api/profileTweets",
            method: 'get',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: (skip + 1) * 10 }
        })
            .then((response) => {
                setTweets((prevState) => {
                    const newState = { data: [] }
                    newState.data.push(...prevState.data)
                    newState.data.push(...response.data.tweets)
                    return newState
                })
                setSkip((prevState) => prevState + 1)

            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <TitleBar />
                <TweetList tweets={tweets.data}
                    setTweetsHandler={setTweetsHandler}
                    url="/api/profileTweets"
                    queryUsername={profileUsername} />
                <button onClick={() => LoadClickHandler()}>load more</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Profile;