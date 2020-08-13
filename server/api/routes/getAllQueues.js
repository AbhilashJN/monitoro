const queueUtils = require('../utils/queueUtils')

const handler= async (req,res)=>{
    const Queues = req.app.locals.MonitoroQueues
    const totalQueuesConnected = Queues.length
    let totalActiveJobs = 0
    let totalCompletedJobs = 0
    let totalFailedJobs = 0 
    let totalWaitingJobs = 0
    let totalDelayedJobs = 0
    const allQueuesPromises =  Queues.map(async (queueConfig)=>{
        const queue = queueUtils.createQueueConnection(queueConfig.name,Queues)
        const queueOverview = await queueUtils.getJobCountsByStatus(queue)
        totalActiveJobs += queueOverview.active
        totalCompletedJobs += queueOverview.completed
        totalFailedJobs += queueOverview.failed
        totalWaitingJobs += queueOverview.waiting
        totalDelayedJobs += queueOverview.delayed
        await queue.close()
        return {name:queueConfig.name,queueOverview}
    })    
    const allQueues = await Promise.all(allQueuesPromises)
    return res.json({allQueues,totalQueuesConnected,totalActiveJobs,totalCompletedJobs,totalFailedJobs,totalWaitingJobs,totalDelayedJobs})
}

module.exports = handler