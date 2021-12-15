import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"

import UserList from './userList'
import Navbar from './navbar'
import FollowSuggestion from './followSuggestion'

import {
    BiArrowBack as BackIcon,
} from "react-icons/bi"


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

    const backButtonHandler = () => {
        history.push("/home")
    }

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

    const LoadClickHandler = () => {
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
                            <div className="search-box">
                                <input onChange={searchInputOnChange} 
                                placeholder='search user'></input>
                            </div>
                        </div>
                        <div className="top-bar-flex-item-side">
                            <button onClick={searchButtonHandler}>search</button>
                        </div>
                    </div>
                </div>
                <UserList users={users} />
                <button className="load-more" onClick={() => LoadClickHandler()}>:</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Explore;