import React, { useState, useContext, Component } from 'react';
import '../styles/TweetCard.css';
import { SmallAvatar } from '../images/avatars'
import { NodIcon, ShakeIcon } from '../images/svg/svgs'
import { UserIcon } from '../images/svg/svgs';
import { Link } from 'react-router-dom';

import Moralis from 'moralis/dist/moralis.min.js';

import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks'

export const Login = ({ setLogInfo }) => {

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
    
        const chainId = 137;
        const chainName = "Polygon Mainnet";
        const currencyName = "MATIC";
        const currencySymbol = "MATIC";
        const rpcUrl = "https://rpc-mainnet.maticvigil.com/";
        const blockExplorerUrl = "https://polygonscan.com/";
        await Moralis.enableWeb3();
    
        await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
        );
    
        
        const chainid = await Moralis.getChainId();
        //console.log(chainid); 
        const chainID = "0x89"; 
        const chainIdHex = await Moralis.switchNetwork(chainID); 

        setLogInfo(true)
    }

    return (
        <Link >
            <div style={{ marginLeft:'64rem', marginTop:'16rem'}} className="tweet-card">
                <div className="right">
                    <div className="tweet-card-body">
                        <div className="tweet-card-content">
                            <h1 style={{fontWeight:'800', fontSize:'30px', paddingLeft:'70px', color:'#4030FF', paddingBottom:'20px'}}className="m-0">Welcome to Header!</h1>
                        </div>
                        <div style={{backgroundColor:"#2f3136", borderRadius:"13px", padding:"1rem", marginTop:"1rem"}} className="new-tweet-options">
                            <div onClick={login} style={{width:'400px', height:'60px', paddingTop:'40px', fontSize:'25px'}} className="btn tweet-btn text-center">Connect Wallet</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
