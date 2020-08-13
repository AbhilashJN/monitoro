import React from 'react';
import './JobDetailsHeader.css';


const JobDetailsHeader = () => {
    return (
        <div className="JobDetailsHeader-container">
            <div className="JobDetailsHeader-stat">
                Status
            </div>
            <div className="JobDetailsHeader-stat">
                Job ID
            </div>
            <div className="JobDetailsHeader-stat">
                Attempts
            </div>
            <div className="JobDetailsHeader-stat">
                Progress
            </div>
            <div className="JobDetailsHeader-timestamps-container">
                Timestamps
            </div>
            <div className="JobDetailsHeader-button">
                Data
            </div>
            <div className="JobDetailsHeader-button">
                Result
            </div>
        </div>
    )
}

export default JobDetailsHeader