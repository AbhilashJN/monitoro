const Queue = require('bull')
const Redis = require('ioredis')
const search = require('../utils/deepSearchKeyValue')
const queueUtils = require('../utils/queueUtils')

const handler=async (req,res)=>{
    const {queueName,status} = req.params;
    const {skey,sval} = req.query
    const Queues = req.app.locals.MonitoroQueues
    const queue = queueUtils.createQueueConnection(queueName,Queues);
    const jobs = await queueUtils.getQueueJobsByStatus(queue,status)
    const matchingJobs=jobs[status].filter(job=>search(job.data,skey,sval))
    const allJobsDetails = await queueUtils.getJobsDetails(matchingJobs)
    queue.close()
    return res.json(allJobsDetails)
}

module.exports = handler
