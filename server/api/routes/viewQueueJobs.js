const Queue = require('bull')
const Redis = require('ioredis')
const queueUtils = require('../utils/queueUtils')

const handler = async (req,res)=>{
    const {queueName,status} = req.params
    const Queues = req.app.locals.MonitoroQueues
    const queue = queueUtils.createQueueConnection(queueName,Queues)
    const allJobCountsByStatus = await queueUtils.getJobCountsByStatus(queue)
    const jobs = await queueUtils.getQueueJobsByStatus(queue,status)
    const allJobsDetails = await queueUtils.getJobsDetails(jobs[status])
    const {redis_version,connected_clients,blocked_clients,total_system_memory_human,used_memory_human} = queue.client.serverInfo
    const redisStats = {
        "Redis Version":redis_version,
        "Connected Clients":connected_clients,
        "Blocked Clients":blocked_clients,
        "Total System Memory":total_system_memory_human,
        "Used Memory":used_memory_human
    }
    await queue.close();
    return res.json({allJobCountsByStatus,allJobsDetails,redisStats})
}

module.exports = handler