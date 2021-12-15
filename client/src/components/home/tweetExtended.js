import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios"

import TweetList from './tweetList';
import ComposeCompact from "./composeCompact"
import Navbar from './navbar';
import FollowSuggestion from './followSuggestion';
import TweetCompact from './tweetCompact';

import {
    BiArrowBack as BackIcon,
} from "react-icons/bi"

const TweetExtended = (props) => {
    const { tweetID } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.userReducer)
    const [tweet, setTweet] = useState({
        body: "",
        likesCount: "",
        retweetCount: "",
        repliesCount: "",
        user: { displayName: "", username: "" },
        createdAt: "",
        _id: ""
    })
    const [tweets, setTweets] = useState({
        data: [{
            body: "",
            likesCount: "",
            retweetCount: "",
            repliesCount: "",
            retweetData: {
                user: { displayName: "" }
            },
            user: { displayName: "", username: "" },
            createdAt: ""
        }]
    })
    const [skip, setSkip] = useState(0)

    const backButtonHandler = () => {
        history.push("/home")
    }

    const setTweetsHandler = (response) => {
        setTweets(() => {
            return { data: response.data.tweets }
        })
    }

    const addReply = (reply) => {
        setTweets((prevState) => {
            const prevTweets = [...prevState.data]
            prevTweets.push(reply)
            return {
                data: prevTweets
            }
        })
    }

    const LoadClickHandler = () => {
        axios({
            url: "/api/getReplies",
            method: 'get',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: (skip + 1) * 10, tweetID:tweet._id }
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

    useEffect(() => {
        axios({
            url: "/api/tweetInfo",
            method: "get",
            params: {
                tweetID
            }
        })
            .then((res) => {
                setTweet((prevState) => {
                    return {
                        body: res.data.body,
                        likesCount: res.data.likesCount,
                        retweetCount: res.data.retweetCount,
                        repliesCount: res.data.repliesCount,
                        createdAt: res.data.createdAt,
                        user: res.data.user,
                        _id: res.data._id,
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <div className="top-bar">
                    <div className="top-bar-flex">
                        <div className="top-bar-flex-item-side">
                            <div className="back-button-wrapper">
                                <div className="back-button" onClick={backButtonHandler}>
                                    <BackIcon style={{ fontSize: "1.25em" }} />
                                </div>
                            </div>
                        </div>
                        <div className="top-bar-flex-item-middle">
                            <div className="tweet-title">
                                <div>Tweet</div>
                            </div>
                        </div>
                        <div className="top-bar-flex-item-side"></div>
                    </div>
                </div>
                {tweet.body == "" || user.username == "" ? null : <TweetCompact tweet={tweet} extend={true} />}
                <div className="compose-reply-box">
                    {tweet.body == "" || user.username == "" ? null : <ComposeCompact setTweets={addReply} replyTo={{
                        tweetID: tweet._id,
                    }} />}
                </div>
                {tweet._id == "" ? null : <TweetList tweets={tweets.data} setTweetsHandler={setTweetsHandler}
                    url="/api/getReplies" query={{ tweetID: tweet._id }} />}
                <button className="load-more" onClick={() => LoadClickHandler()}>:</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default TweetExtended;