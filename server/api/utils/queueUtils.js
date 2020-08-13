const Queue = require('bull')

const createQueueConnection = (queueName,allQueueConfigs) => {
    const queueConfig = allQueueConfigs.find((config)=>{return config.name===queueName})
    const queue = new Queue(queueName, queueConfig.url)
    return queue
}

const getJobCountsByStatus = async (queue)=>{
    const counts = await queue.getJobCounts()
    return counts
}

const getQueueJobsByStatus = async (queue,...statuses) => {
    const fetchedJobs = statuses.reduce(async (acc,status)=>{
        let jobs=[];
        switch (status){
            case 'all':
                jobs = await queue.getJobs();
                return {...acc,all:jobs}
                break;
            case 'completed':
                jobs= await queue.getCompleted();
                return {...acc,completed:jobs}
                break;
            case 'failed':
                jobs = await queue.getFailed();
                return {...acc,failed:jobs}
                break;
            case 'active':
                jobs = await queue.getActive();
                return {...acc,active:jobs}
                break;
            case 'delayed':
                jobs = await queue.getDelayed();
                return {...acc,delayed:jobs}
                break;
            case 'waiting':
                jobs = await queue.getWaiting(); 
                return {...acc,waiting:jobs}
                break;
        }
    },{});
    return fetchedJobs;
}



const getJobsDetails = async (jobs,state='all')=>{
    const jobsDetailsPromises = jobs.map(async (job)=>{
        const jobState = state === 'all' ? await job.getState() : state
        return {
                jobId : job.id,
                progress :  job.progress(),
                timestamps : {
                    added: new Date(job.timestamp),
                    processed: new Date(job.processedOn),
                    finished: new Date(job.finishedOn)
                },
                attempts : job.attemptsMade + 1,
                data: job.data,
                jobState,
                returnValue: job.returnvalue,
                failedReason: job.failedReason,
                stacktrace: job.stacktrace
        }
    })
    const jobsDetails = Promise.all(jobsDetailsPromises)
    return jobsDetails
}

module.exports = {
    createQueueConnection,
    getQueueJobsByStatus,
    getJobCountsByStatus,
    getJobsDetails
}