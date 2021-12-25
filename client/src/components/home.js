import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from './avatar';
import Navbar from "./navbar";
import ComposeCompact from "./composeCompact"
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import useTweetList from '../hooks/useTweetList';
import TopBar from './topBar';

import {
    AiFillEdit as ComposeIcon,
} from "react-icons/ai"

const iconStyle = {
    fontSize: "1.6em",
    color: "rgb(29, 155, 240)"
}

const Home = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)
    const username = useSelector(state => state.userReducer.username)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const composeHandler = () => {
        history.push("/compose")
    }
    const [tweets, loadMore, setTweets] = useTweetList("/api/home", {})

    return (
        <div className="main-app">
            <div className='side-section-left-wrapper'>
                <div className="side-section left">
                    <Navbar />
                </div>
            </div>
            <div className="middle-section">
                <div className='middle-sections-container'>
                    <div className='middle-section-left'>
                        <TopBar needsDesktop={true}
                            Left={
                                <div className="avatar-box">
                                    <Avatar username={username} size="32" />
                                </div>
                            }
                            Middle={
                                <div className="title-box">
                                    Home
                                </div>
                            }
                            Right={
                                <div className="composeIcon" onClick={composeHandler}>
                                    <ComposeIcon style={iconStyle} />
                                </div>
                            } />
                        <div className="compose-tweet-box">
                            <ComposeCompact setTweets={setTweets} />
                        </div>
                        <TweetList tweets={tweets} alt={
                            <div className='alt-container'>
                                <div className='alt-flex'>
                                    <div className='alt-item-wrapper'>
                                        <span className='alt-item-big'>
                                            What? No Tweets yet?
                                        </span>
                                    </div>
                                    <div className='alt-item-wrapper'>
                                        <span className='alt-item-small'>
                                            This empty timeline won't be around for long. Start following
                                            people and you'll see Tweets show up here.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        } />
                        {tweets.length < 10 ? null : <button className="load-more" onClick={loadMore}>load more tweets</button>}
                    </div>
                    <div className='middle-section-right'>
                        <div className="side-section right">
                            <FollowSuggestion />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;