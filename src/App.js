import React,{useState} from 'react';
import './App.css';
import AllQueuesPage from './components/AllQueuesPage'
import QueueDetailsPage from './components/QueueDetailsPage'
import Header from './components/Header'



const router=(page,setPage)=>{
  const {pageName,queueName} = page;
  switch(pageName){
    case 'QueueDetailsPage': 
      return <QueueDetailsPage queueName={queueName} changePage={()=>{setPage({pagename:'AllQueuesPage',queueName:''})}}/>;
    case 'AllQueuesPage':
      return <AllQueuesPage changePage={(queueName)=>setPage({pageName:'QueueDetailsPage',queueName:queueName})}/>;
    default:
      return <AllQueuesPage changePage={(queueName)=>setPage({pageName:'QueueDetailsPage',queueName:queueName})}/>;
}
}

function App() {
  const [page,setPage] = useState({pageName:'AllQueuesPage',queueName:''})
  return (
    <div className="App">
      <Header/>
      {
      router(page,setPage)
      }
    </div>
  );
}

export default App;
