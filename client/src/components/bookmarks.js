import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from './avatar';
import Navbar from "./navbar";
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import TopBar from './topBar';
import useTweetList from '../hooks/useTweetList';

const Bookmarks = (props) => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)
    const username = useSelector(state => state.userReducer.username)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const [tweets, loadMore] = useTweetList("/api/bookmarks", {})

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
                                    Bookmarks
                                </div>
                            }
                            Right={
                                <div></div>
                            } />
                        <TweetList tweets={tweets} alt={
                            <div className='alt-container'>
                                <div className='alt-flex'>
                                    <div className='alt-item-wrapper'>
                                        <span className='alt-item-big'>
                                            You haven’t added any Tweets to your Bookmarks yet
                                        </span>
                                    </div>
                                    <div className='alt-item-wrapper'>
                                        <span className='alt-item-small'>
                                            When you do, they’ll show up here.
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
}

export default Bookmarks;