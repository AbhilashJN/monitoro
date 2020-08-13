import React from 'react';
import './StatBox.css';

function StatBox(props){
return(
    <div className='statbox-border'>
        <div className='statbox-container'>
            {props.type==='stat'
            ?
            (  <>
                <span className='statbox-label'>{props.label}</span>
                <span className='statbox-value'>{props.value}</span>
                </>
            )
            :
            (
                props.children
            )
        }
        </div>
    </div>

)
}

export default StatBox
