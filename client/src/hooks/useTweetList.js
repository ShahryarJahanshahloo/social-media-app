import { useState, useEffect } from 'react';
import axios from 'axios';

const useTweetList = (URL, PARAMS) => {
    const jwt = localStorage.getItem("jwt")
    const [tweets, setTweets] = useState([{
        body: "",
        likesCount: "",
        retweetCount: "",
        repliesCount: "",
        retweetData: {
            user: { displayName: "" }
        },
        user: { displayName: "", username: "" },
        createdAt: ""
    }])
    const [skip, setSkip] = useState(0)

    const setTweetsHandler = (response) => {
        setTweets(() => {
            return response.data.tweets
        })
    }

    const loadMore = () => {
        axios({
            url: URL,
            method: 'get',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: (skip + 1) * 10, ...PARAMS }
        })
            .then((response) => {
                setTweets((prevState) => {
                    const newState = []
                    newState.push(...prevState)
                    newState.push(...response.data.tweets)
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
            url: URL,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: 0, ...PARAMS }
        })
            .then((res) => {
                if (res.data.tweets.length !== 0) {
                    setTweetsHandler(res)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return [tweets, loadMore, setTweets]
}

export default useTweetList