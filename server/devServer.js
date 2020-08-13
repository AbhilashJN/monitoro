
const express = require('express')
const app = express()
const port = 9000
const monitoroRouter = require('./router')
const monitoroQueues = [
    { 
      "name": "Queue1", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Queue2", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Queue3", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Queue4", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Queue5", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    }
]

app.locals.MonitoroQueues = monitoroQueues
app.use('/',monitoroRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})