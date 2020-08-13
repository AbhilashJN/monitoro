import React from 'react';
import './CategoriesTab.css';
import allIcon from '../../icons/all.png'
import activeIcon from '../../icons/active.png'
import completedIcon from '../../icons/completed.png'
import failedIcon from '../../icons/failed.png'
import delayedIcon from '../../icons/delayed.png'
import waitingIcon from '../../icons/waiting.png'

const getTotalJobCount=(categoriesLabels,jobCounts)=>{
    return categoriesLabels.reduce((sum,currentCategory)=>{
        return currentCategory.name==='all'? sum : sum + jobCounts[currentCategory.name]
    },0)
}

const categoriesLabels = [
    {name:'all', color:'#8E80EC', icon:allIcon},
    {name:'active', color:'#337FE6', icon:activeIcon},
    {name:'completed', color:'#05BF75', icon:completedIcon},
    {name:'failed', color:'#F46547', icon:failedIcon},
    {name:'waiting', color:'#FCB136', icon:waitingIcon},
    {name:'delayed', color:'#52C3C9', icon:delayedIcon}
];

const CategoriesTab = (props) => {
return(
    <div className='CategoriesTab-container'>
        {
            categoriesLabels.map((category)=>{
                const isSelected = props.selectedCategory===category.name
                const jobCount = category.name==='all' ? getTotalJobCount(categoriesLabels,props.jobCounts) : props.jobCounts[category.name]
               return ( 
                <div 
                key={category.name} 
                className={`CategoriesTab-tab ${isSelected?'CategoriesTab-selected-tab':''}`} 
                style={isSelected?{
                    backgroundImage:`linear-gradient(${category.color}44 0%,${category.color} 5%,${category.color} 95%,${category.color}44)`
                }:
                {}}
                onClick={()=>{props.setSelectedCategory(category.name)}}
                >
                    <img src={category.icon} className='CategoriesTab-tab-icon' alt=''/>
                    <span className='CategoriesTab-tab-label' style={{color:isSelected?'#ffffff':category.color}}>
                        {category.name}
                        <span className={`CategoriesTab-tab-jobCount ${isSelected?'CategoriesTab-selectedCount':''}`}>{jobCount}</span>
                    </span>
                </div>
                )
            })
        }
    </div>
)
}

export default CategoriesTab