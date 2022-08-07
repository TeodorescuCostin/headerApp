import React from 'react'
import { NewTweet } from '../components/NewTweet';
import '../styles/Main.css';
import { TweetCard } from '../components/TweetCard';


export const Home = () => {
    return (
        <>
            <div className="home">
                <h1>Home</h1>
            </div>
            <NewTweet />
            <div className="tweets">
                <TweetCard />
            </div>
        </>
    )
}
