import React,{useState} from 'react';
import './JobDetails.css';
import addedIcon from '../../icons/added.png'
import processedIcon from '../../icons/processed.png'
import finishedIcon from '../../icons/finished.png'

const JobDetails = (props) => {
    const [viewState,setViewState] = useState('closed')
    const toggleData = (dataType)=> ()=>{
        const nextState = viewState === dataType ? 'closed' : dataType
        setViewState(nextState)
    }
    const formatStackTrace = (stack)=>{
        const formattedStacks = stack.map((stackElement)=>{
            const lines = stackElement.split('\n');
            return lines.reduce((acc,curr)=>{
                return acc+`
                ${curr}`
            },`
            `) 
        })
        return formattedStacks
    }

    const getJobResult = ()=>{
        switch(props.jobInstance.jobState){
            case 'completed':
                return <pre>{JSON.stringify(props.jobInstance.returnValue,null,4)}</pre>
            case 'failed':
                return <pre style={{whiteSpace:'pre-line'}}>{formatStackTrace(props.jobInstance.stacktrace)}</pre>
            default:
                return 'Job has not finished processing'
        }
    }
    return (
        <div className='JobDetails-row'>
            <div className="JobDetails-container">
                <div className="JobDetails-stat">
                    <div className={`JobDetails-status JobDetails-${props.jobInstance.jobState}`}/>
                </div>
                <div className="JobDetails-stat">
                    {props.jobInstance.jobId}
                </div>
                <div className="JobDetails-stat">
                    {props.jobInstance.attempts}
                </div>
                <div className="JobDetails-stat">
                    {props.jobInstance.progress}
                </div>
                <div className="JobDetails-timestamps-container">
                    <span className='JobDetails-timestamp'><img src={addedIcon} className='JobDetails-timestamp-icon' alt=''/> {new Date(props.jobInstance.timestamps.added).toUTCString()}</span>
                    <span className='JobDetails-timestamp'><img src={processedIcon} className='JobDetails-timestamp-icon' alt=''/> {new Date(props.jobInstance.timestamps.processed).toUTCString()}</span>
                    <span className='JobDetails-timestamp'><img src={finishedIcon} className='JobDetails-timestamp-icon' alt=''/> {new Date(props.jobInstance.timestamps.finished).toUTCString()}</span>
                </div>
                <div className="JobDetails-button" onClick={toggleData('data')}>
                    View Job Data<span className={`chevron ${viewState==='data'?'':'bottom'}`}></span>
                </div>
                <div className="JobDetails-button" onClick={toggleData('result')}>
                    View Result<span className={`chevron ${viewState==='result'?'':'bottom'}`}></span>
                </div>
            </div>
            {viewState==='data' &&
            <div className="JobDetails-data">
                <pre>{JSON.stringify(props.jobInstance.data,null,4)}</pre>
            </div>
            } 
            {viewState==='result' &&
            <div className="JobDetails-data">
                {getJobResult()}
            </div>
            } 
        </div>
    )
}

export default JobDetails