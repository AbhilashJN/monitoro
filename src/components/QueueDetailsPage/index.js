import React, {useState, useEffect} from 'react'
import './QueueDetailsPage.css'
import CategoriesTab from '../CategoriesTab'
import JobDetails from '../JobDetails'
import JobDetailsHeader from '../JobDetailsHeader'
import Search from '../Search'
import RedisStats from '../RedisStats'
import backIcon from '../../icons/back.svg'

function QueueDetailsPage(props){
    const initialState={
        allJobCountsByStatus:{
            waiting: 0,
            active: 0,
            completed: 0,
            failed: 0,
            delayed: 0
        },
        allJobsDetails:[]
    }
    const apiUrl = process.env.NODE_ENV==='development' 
    ? `/` 
    : ''
    const [jobData,setJobData] = useState(initialState)
    const [selectedCategory,setSelectedCategory] = useState('all')
    const [searchKey,setSearchKey] = useState('')
    const [searchValue,setSearchValue] = useState('')
    const [searchQuery,setSearchQuery] = useState('')
    const [showSearchResults,setShowSearchResults] = useState(false)
    const [searchResults, setSearchResults] = useState({})
    const [backBtnClicked,setBackBtnClicked] = useState(false)
    
    const triggerSearch = () => {
        setSearchQuery(`?skey=${searchKey}&sval=${searchValue}`)
        setShowSearchResults(true)
    }
    const clearSearch=()=>{
        setSearchQuery('')
        // setSearchKey('')
        // setSearchValue('')
        setShowSearchResults(false)
    }

    useEffect(()=>{
        fetch(`${apiUrl}api/viewQueueJobs/${props.queueName}/${selectedCategory}`)
        .then((response)=>response.json())
        .then((responseBody)=>{
            setJobData(responseBody)
            setShowSearchResults(false)
            setSearchQuery('')
            setSearchKey('')
            setSearchValue('')
        })
    },[selectedCategory]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(showSearchResults){
        fetch(`${apiUrl}api/searchByField/${props.queueName}/${selectedCategory}/${searchQuery}`)
        .then((response)=>response.json())
        .then((responseBody)=>{
            setSearchResults({allJobsDetails:responseBody})
        })
    }
    else{
            setSearchResults({})
    }
    },[showSearchResults]) //eslint-disable-line react-hooks/exhaustive-deps

    const triggerAnim=()=>{
        setBackBtnClicked(true)
    }

    const changePage=()=>{
        if(backBtnClicked){
            props.changePage()
        }
    }

    const {allJobsDetails} = searchResults.hasOwnProperty('allJobsDetails')? searchResults : jobData
    return (
        <div className={`QueueDetailsPage-container ${backBtnClicked?'scalein':''}`} onTransitionEnd={changePage}>
            <div className='QueueDetailsPage-categories-tab'>
                <CategoriesTab selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} jobCounts={jobData.allJobCountsByStatus}/>
            </div>
            <div className='QueueDetailsPage-main-container'>
                <div className="QueueDetailsPage-title-row">
                    <div className='QueueDetailsPage-title'>
                        <img src={backIcon} className='QueueDetailsPage-back-btn' onClick={triggerAnim} alt='back'/>
                        {props.queueName}
                    </div>
                    <Search 
                            searchKey={searchKey}
                            setSearchKey={setSearchKey}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            triggerSearch={triggerSearch}
                            clearSearch={clearSearch}
                            showSearchResults={showSearchResults}
                    />
                </div>
                {   showSearchResults &&
                        <span className='QueueDetailsPage-search-subtitle'>Showing jobs which contain the selected key-value pair in their data object</span>
                    }
                <div className='QueueDetailsPage-jobs-container'>
                <JobDetailsHeader/>
                <div className='QueueDetailsPage-scrollable-container'>
                    {
                        allJobsDetails.length>0?
                    allJobsDetails.map((job)=>{
                        return(
                            <>
                            <JobDetails key={job.jobId} jobInstance={job}/>
                            </>
                        )
                    }):
                    <div className='QueueDetailsPage-search-subtitle' style={{marginTop:'25px'}}>No jobs found</div>
                    }
                </div>
                </div>
            </div>
            <div className='QueueDetailsPage-overview-tab'>
           < RedisStats stats={jobData.redisStats}/>
            </div>
        </div>
    )
}

export default QueueDetailsPage