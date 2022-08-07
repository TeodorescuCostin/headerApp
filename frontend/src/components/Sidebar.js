import React from 'react';
import { Logo, HomeIcon, ExploreIcon, NotificationIcon, MessageIcon, BookmarkIcon, ListsIcon, MoreIcon } from '../images/svg/svgs';
import { SmallAvatar } from '../images/avatars';

export const Sidebar = () => {
    const profImageurl = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
    return (
        <div>
            <div className="side-nav-header">
                <Logo />
            </div>
            <div className="side-nav-items">

                <ul className="p-0">
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">

                            <SmallAvatar width="22" image={profImageurl} />
                            <span className="side-nav-text">Profile</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <MoreIcon />
                            <span className="side-nav-text">More</span>
                        </div>
                    </li>

                </ul>
            </div>

        </div>
    )
}
