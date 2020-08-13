import React from 'react'
import './Search.css'
import searchIcon from '../../icons/search.png'
import closeIcon from '../../icons/close.png'

const Search = (props)=>{
    return(
        <div className='QueueDetailsPage-search-container'>
             <div className='QueueDetailsPage-search-fields-container'>
                    <input 
                    type='text' 
                    className='QueueDetailsPage-search-field-input' 
                    placeholder='Key' 
                    value={props.searchKey}
                    onChange={e=>props.setSearchKey(e.target.value)}
                    />
                    <input 
                    type='text' 
                    className='QueueDetailsPage-search-field-input' 
                    placeholder='Value' 
                    value={props.searchValue}
                    onChange={e=>props.setSearchValue(e.target.value)}
                    />
            </div>
            {!props.showSearchResults?
                <div className='QueueDetailsPage-search-button' onClick={props.triggerSearch}>
                    <img src={searchIcon} className='QueueDetailsPage-search-btn-icon' alt=''/>
                </div>
                :
                <div className='QueueDetailsPage-search-button' onClick={props.clearSearch}>
                    <img src={closeIcon} className='QueueDetailsPage-search-btn-icon' alt=''/>
                </div>
                }
        </div>
    )
}


export default Search