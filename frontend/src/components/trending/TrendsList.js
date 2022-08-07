import React from 'react';
import { Trend } from '../trending/Trend';
import { SettingsIcon } from '../../images/svg/svgs';

export const TrendsList = () => {
    const trends = [
        {
            name: '0xCFFaDe8887E10009E909B7a1F6fa7d54af09Dd35',
            topic: '#crypto',
            tweets: '1'
        }
    ]
    return (
        <div>
            <div className="trends-for-you flex-space-between">
                <h1 className="m-0">Trending</h1>
            </div>
            <div className="trends">
                {trends.map(trend => (<Trend trend={trend} />))}
            </div>
        </div>
    )
}
