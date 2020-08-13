import React from 'react'
import './RedisStats.css'

const RedisStats=({stats})=>{

    return(
        <div className='redis-stats-container'>
            {
                stats &&
                Object.keys(stats).map((key)=>{
                    return(
                        // <div className='redis-stats-gradient-border'>
                            <div className='redis-stats-section'>
                                <span className='redis-stats-header'>{key}</span>
                                <span className='redis-stats-value'>{stats[key]}</span>
                            </div>
                        // </div>
                    )
                })
            }
        </div>
    )
}


export default RedisStats