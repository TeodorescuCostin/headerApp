import React, { useState, useContext, Component } from 'react';
import '../styles/TweetCard.css';
import { SmallAvatar } from '../images/avatars'
import { NodIcon, ShakeIcon } from '../images/svg/svgs'
import { UserIcon } from '../images/svg/svgs';
import { Link } from 'react-router-dom';

import Moralis from 'moralis/dist/moralis.min.js';

import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks'

export const TweetCard = () => {
    const profImageurl = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
    
    const [id, setId] = useState([])
    const data  = useNFT('0x60e4d786628fea6478f785a6d7e704777c86a7c6', {id})

    const [hashtags, setHashtags] = useState([{value: '#crypto'}])
    const [image, setImage] = useState('https://bafybeieg7so2ontk7lvb2wu6x5ovhy4xgtlcrtjwsfiyo27o3xfhmh2ipi.ipfs.infura-ipfs.io/')  
    const [userImage, setUserImage] = useState([])
    const [userName, setUserName] = useState('0xCFF...9Dd35')
    const [content, setContent] = useState([])

    const [count, setCount] = useState(0)
    
    const serverUrl="https://drww6jthgc1z.usemoralis.com:2053/server";
    const appId="TF33IR2fFIdZclNmTe4Xi0myM01dJiXqjSPvStI1";
    Moralis.start({ serverUrl, appId });

    async function login() {
    
        let user = Moralis.User.current();
        if(!user) {
            try {
                user = await Moralis.authenticate({ signingMessage: "Authenticate"});
                await Moralis.enableWeb3();
                console.log(user);
                console.log(user.get('ethAddress'));
    
            }catch (error) {
            console.log(error);}
        }
    }

    async function nod() {
        await login()
        let options = {
            contractAddress: "0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9",
            functionName: "inc",
            abi: [{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}],
            params: {
                note: "Seems that this post is good!!",
            },
            msgValue: Moralis.Units.ETH(0)
        }

        await Moralis.executeFunction(options);

        setCount(count+1)
        
    }

    async function shake() {
        
        await login()
        let options = {
            contractAddress: "0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9",
            functionName: "dec",
            abi: [{"inputs":[],"name":"get","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}],
            params: {
                note: "It's ok not all people are artists :/",
            },
            msgValue: Moralis.Units.ETH(0)
        }

        await Moralis.executeFunction(options);
     
        setCount(count-1)
    }


    return (
        <Link >
            <div className="tweet-card">
                <div className="left">
                    <SmallAvatar width="48" image={profImageurl} />
                </div>
                <div className="right">
                    <div className="tweet-card-head">
                        <span className="tweet-card-name" >{userName}</span>
                    </div>
                    <div className="tweet-card-body">
                        <div className="tweet-card-image">
                            <img src={image} alt="" />
                        </div>
                        <div className="tweet-card-content">
                            <p className="m-0">Hi I just want to introduce you to this platform :)</p>
                        </div>
                        {
                            hashtags && hashtags.length > 0 &&

                            <div style={{marginTop:'8px'}} className="flex-align-center">
                            {

                                hashtags.map((item) => 
                                    (
                                        <div>
                                            <div style={{marginRight:'19px'}} className="tweet">
                                                <div className="btn tweet-btn text-center">{item.value}</div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                            </div>
                        }
                        <div style={{backgroundColor:"#2f3136", borderRadius:"13px", padding:"1rem", marginTop:"1rem"}} className="new-tweet-options">
                            <div onClick={nod} className="btn tweet-btn text-center">
                                <NodIcon />
                            </div>
                            <span style={{fontSize:"3rem", paddingLeft:"5rem", paddingRight:"5rem"}}className="tweet-card-name">{count}</span>
                            <div onClick={shake} className="btn tweet-btn text-center">
                                <ShakeIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
