const express = require('express')
const router = express.Router()
const path = require('path')
const getAllQueues = require('./api/routes/getAllQueues')
const viewQueueJobs = require('./api/routes/viewQueueJobs')
const searchByField = require('./api/routes/searchByField')


router.get('/api/getAllQueues',getAllQueues)
router.get('/api/viewQueueJobs/:queueName/:status',viewQueueJobs)
router.get('/api/searchByField/:queueName/:status',searchByField);
router.use('/',express.static(path.join(__dirname, '..','build')));


module.exports = router