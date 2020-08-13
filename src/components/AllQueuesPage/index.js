import React,{useEffect,useReducer, useState} from 'react'
import StatBox from '../StatBox'
import QueueOverview from '../QueueOverview'
import QueueOverviewHeader from '../QueueOverviewHeader'
import './AllQueuesPage.css';
import forwardIcon from '../../icons/forward.svg'


const initialState={
    allQueues: [],
    totalQueuesConnected: 0,
    totalActiveJobs: 0,
    totalCompletedJobs: 0,
    totalFailedJobs: 0,
    totalWaitingJobs: 0,
    totalDelayedJobs: 0,
}

const reducer=(state,action)=>{
    switch(action.type){
        case 'setAllQueues':
            return {...state, allQueues:action.data}
        case 'setTotalQueuesConnected':
            return {...state, totalQueuesConnected:action.data}
        case 'setTotalActiveJobs':
            return {...state, totalActiveJobs:action.data}
        case 'setTotalCompletedJobs':
            return {...state, totalCompletedJobs:action.data}
        case 'setTotalFailedJobs':
            return {...state, totalFailedJobs:action.data}
        case 'setTotalWaitingJobs':
            return {...state, totalWaitingJobs:action.data}
        case 'setTotalDelayedJobs':
            return {...state, totalDelayedJobs:action.data}
        case 'setAll':
            return action.data
        default:
            return state
    }
}

function AllQueuesPage(props){

const [state,dispatch] = useReducer(reducer,initialState)
const [selectedQueue,setSelectedQueue] = useState(null)
const selectQueue = (queueName) => ()=>{
    setSelectedQueue(queueName)
}
const goToQueuePage=()=>{
    props.changePage(selectedQueue)
}
const getSuccessRatio = ()=>{
    if(state.totalCompletedJobs+state.totalFailedJobs === 0){
        return 'N/A'
    }
    const percentage = state.totalCompletedJobs * 100 / (state.totalCompletedJobs + state.totalFailedJobs)
    return `${Math.floor(percentage)} %`
}
useEffect(()=>{
    const apiUrl = process.env.NODE_ENV==='development' 
    ? `/` 
    : ''
    const fetchData = async () => {
         const resp = await fetch(`${apiUrl}api/getAllQueues`)
         const respBody = await resp.json()
         dispatch({type: 'setAll', data: respBody})
        }
    fetchData()
},[])
return (
    <div className='allQueues-container'>
        <div className='allQueues-statboxes-title'>Summary</div>
        <div className='allQueues-statboxes-row'>
        <StatBox type={'stat'} label={'Queues Connected'} value={state.totalQueuesConnected}/>
        <StatBox type={'stat'} label={'Active Jobs'} value={state.totalActiveJobs}/>
        <StatBox type={'stat'} label={'Completed Jobs'} value={state.totalCompletedJobs}/>
        <StatBox type={'stat'} label={'Failed Jobs'} value={state.totalFailedJobs}/>
        <StatBox type={'stat'} label={'Success Ratio'} value={getSuccessRatio()}/>
        </div>
        <div className='allQueues-queueOverviews-container'>
            <QueueOverviewHeader/>
            <div className='allQueues-scrollable-container'>
            {
                state.allQueues.map((queue)=>{
                    return (
                    <QueueOverview 
                    key={queue.name} 
                    name={queue.name} 
                    data={queue.queueOverview} 
                    selectQueue={selectQueue(queue.name)}/>
                    )
                })
            }
            </div>
        </div>
        <div className={`allQueues-anim-overlay ${selectedQueue?'show-overlay':''}`} onTransitionEnd={goToQueuePage}/>
        <img src={forwardIcon} className={`allQueues-anim-overlay-icon ${selectedQueue?'show-overlay':''}`} alt=''/>
    </div>
)
}

export default AllQueuesPage