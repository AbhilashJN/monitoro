import React from 'react'
import './QueueOverviewHeader.css'

const QueueOverviewHeader = (props) =>{
    return (
        <div className='QueueOverviewHeader-Container'>
            <div className='QueueOverviewHeader-left'>
                <div className='QueueOverviewHeader-open-button'/>
                queue name
            </div>
            <div className='QueueOverviewHeader-right'>
                <div className='QueueOverviewHeader-label'>
                    active
                </div>
                <div className='QueueOverviewHeader-label'>
                    completed
                </div>
                <div className='QueueOverviewHeader-label'>
                    failed
                </div>
                <div className='QueueOverviewHeader-label'>
                    waiting
                </div>
                <div className='QueueOverviewHeader-label'>
                    delayed
                </div>
                <div className='QueueOverviewHeader-label-xl'>
                    success ratio
                </div>
            </div>
        </div>
    )
}

export default QueueOverviewHeader