import React from 'react'
import './QueueOverview.css'
import forwardIcon from '../../icons/forward.svg'

const QueueOverview = (props) =>{
    return (
        <div className='QueueOverview-Container'>
            <div className='QueueOverview-left'>
                <div className='QueueOverview-open-button' onClick={props.selectQueue}>
                    <img src={forwardIcon} className='QueueOverview-btn-icon' alt=''/>
                </div>
                {props.name}
            </div>
            <div className='QueueOverview-right'>
                <div className='QueueOverview-stat'>
                    <span>{props.data.active}</span>
                </div>
                <div className='QueueOverview-stat'>
                    <span style={{color:'#7FE3CB'}}>{props.data.completed}</span>
                </div>
                <div className='QueueOverview-stat'>
                    <span style={{color:'#F87A7C', fontWeight:'bold'}}>{props.data.failed}</span>
                </div>
                <div className='QueueOverview-stat'>
                    <span>{props.data.waiting}</span>
                </div>
                <div className='QueueOverview-stat'>
                    <span>{props.data.delayed}</span>
                </div>
                <div className='QueueOverview-chart'>
                    {props.data.completed+props.data.failed===0
                    ? 0
                    : Math.floor(props.data.completed/(props.data.completed+props.data.failed) * 100)}%
                </div>
            </div>
        </div>
    )
}

export default QueueOverview