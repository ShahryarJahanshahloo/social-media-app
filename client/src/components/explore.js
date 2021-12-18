import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"

import UserList from './userList'
import Navbar from './navbar'
import FollowSuggestion from './followSuggestion'
import TopBar from './topBar';
import Avatar from './avatar'

const Explore = () => {
    const [query, setQuery] = useState("")
    const history = useHistory()
    const user = useSelector(state => state.userReducer)

    const [users, setUsers] = useState([{
        username: "",
        displayName: "",
        bio: "",
        _id: "",
    }])
    const [skip, setSkip] = useState(0)

    const searchButtonHandler = () => {
        axios({
            url: "/api/search",
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: 0, query }
        })
            .then((res) => {
                if (res.data.users.length !== 0) {
                    setUsers(() => {
                        return res.data.users
                    })
                    setSkip(() => 0)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const searchInputOnChange = (e) => {
        setQuery(() => {
            return e.target.value
        })
    }

    const loadMore = () => {
        axios({
            url: "/api/search",
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: (skip + 1) * 10, query: query }
        })
            .then((response) => {
                setUsers((prevState) => {
                    const newState = []
                    newState.push(...prevState)
                    newState.push(...response.data.users)
                    return newState
                })
                setSkip((prevState) => prevState + 1)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const left =
        <div className="avatar-box">
            <Avatar username={user.username} size="32" />
        </div>

    const middle =
        <div className="search-box">
            <input onChange={searchInputOnChange}
                placeholder='Search User'></input>
        </div>

    const right =
        <button onClick={searchButtonHandler}>search</button>

    return (
        <div className="main-app">
            <div className="side-section left">
                <Navbar />
            </div>
            <div className="middle-section">
                <TopBar Left={left} Middle={middle} Right={right} />
                <UserList users={users} />
                {users[0].username == "" ? null :<button className="load-more" onClick={loadMore}>load more</button>}
            </div>
            <div className="side-section right">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Explore;