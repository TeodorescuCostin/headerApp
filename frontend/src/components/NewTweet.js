import React, { useState, useContext } from 'react'
import { SmallAvatar } from '../images/avatars'
import { AddImageIcon, AddGifIcon, con } from '../images/svg/svgs'
import { GlobalContext } from '../context/GlobalState';

import { DropdownMultiple } from 'reactjs-dropdown-component';

import axios from "axios";

const { create } = require('ipfs-http-client');
const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

export const NewTweet = () => {
    const profImageurl = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

    const [content, setContent] = useState('');
    const { addTweet } = useContext(GlobalContext);

    const [file, setFile] = useState('');
    const [pathFile, setPathFile] = useState('');
    const [img, setImg] = useState();

    const [textareaVal, setTextareaVal] = useState('')

    const [hashtags, setHashtags] = useState([]);
    const handleNewTweet = () => addTweet(content);

    const locations = [
        {
          label: '#crypto',
          value: 'crypto',
        },
        {
          label: '#bitcoin',
          value: 'bitcoin',
        },
        {
          label: '#value',
          value: 'value',
        },
        {
            label: '#life',
            value: 'life',
        },
        {
            label: '#health',
            value: 'health',
        },
        {
            label: '#sun',
            value: 'sun',
        },
      ];

      const getLink = async (e) => {
        
      }

      async function onSubmit(e) {
        const cid = await ipfs.add(file);
        setPathFile(cid.path)

        console.log(JSON.stringify({
            path: cid.path,
            text: textareaVal
        }))

        await fetch("/api/post", {
            method: "POST",
            // Data will be serialized and sent as json
            body: "ana",
            // tell the server we're sending JSON
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

      const sendPost = async (e) => {
        await onSubmit();
      }

      const onChange = (e) => {
        setFile(e.target.files[0]);
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
      };

      const updateText = (e) => {
        setTextareaVal({textareaVal: e.target.value})
    }
      
    return (
        <div className="new-tweet">
            <div className="left">
                <SmallAvatar width="48" image={profImageurl} />
            </div>
            <div className="right">
                <div className="new-tweet-options">
                    <div className="add-icons">
                        <label style={{cursor:"pointer"}}type="submit" >
                            <AddImageIcon />
                            <input
                                style={{display: 'none'}}
                                type='file'
                                className='custom-file-input'
                                accept="image/png"
                                id='customFile'
                                onChange={onChange}
                            />
                        </label> 
                        <label style={{cursor:"pointer"}}type="submit" >
                        <AddGifIcon />
                            <input
                                style={{display: 'none'}}
                                type='file'
                                className='custom-file-input'
                                accept="image/gif"
                                id='customFile'
                                onChange={onChange}
                            />
                        </label>                         
                    </div>
                </div>
                <div className="tweet-card-image">
                    <img style={{maxHeight:"600px", maxWidth:"600px", borderRadius:"23px", marginTop:"15px", marginBottom:"15px"}} src={img}alt="" />
                </div>
                <div className="flex-align-center">
                    <span className="w-100">
                        <input className="w-100" placeholder="What's happening?" type="text" onChange={updateText} />
                    </span>
                </div>
                
                {
                    hashtags && hashtags.length > 0 &&

                    <div  className="flex-align-center">
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
                <div style={{marginBottom:'13px', marginTop:'13px'}}>
                    <DropdownMultiple className="tweet-btn-scroll"
                        searchable={['Search for location', 'No matching location']}
                        styles={{
                            header: { backgroundColor:'#2f3136', borderColor:'#2f3136', borderRadius: '13px'},
                            headerTitle: { color: '#4030ff', fontWeight:"800", fontSize:"16px" },
                            arrowDownIcon : { color: '#4030ff'},
                            list: {backgroundColor:'#2f3136', borderColor:'#2f3136', borderRadius: '13px', boxShadow:'none', marginTop:'13px'},
                            listItem: { color:'#818182'}
                            
                        }}
                        name="location"
                        title="Select Hashtags"
                        titleSingular="Hashtag"
                        titlePlural="Hashtags"
                        list={locations}
                        onChange={(item) => setHashtags([...hashtags, item[item.length-1]])}
                    />
                </div>
                <div className="new-tweet-options">
                    <div className="tweet" onClick={sendPost}>
                        <div className="btn tweet-btn text-center">Post</div>
                    </div>
                </div>
            </div>

        </div>
    )

}
