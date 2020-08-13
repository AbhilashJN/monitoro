# Monitoro
Dashboard for monitoring Bull queues , built using Express and React. Can be mounted as middleware in an existing express app.
Current features:
 - View job details like job id, progress, timestamps, job data, result, errors.
 - Filter jobs based on state: active, completed, failed, waiting, delayed
 - Key-Value based search on job data for finding specific jobs.
 - Simple stats to highlight queue performance/health.
 - Does not interfere with your existing way of working with bull. This dashboard can be deployed as a self contained middleware in your existing express server or on a separate server entirely.
 - Currently only supports monitoring tasks.  Adding/deleting/retrying jobs is not possible from this dashboard in the current version.
 
Planned features:
 - Search based on job results
 - Pagination+lazy-load to handle large number of jobs
 - Delete/Retry job from the UI
 


## Usage
 - Install the module `npm install monitoro`
 - Import it in your express app
    ```javascript 
    const monitoro = require('monitoro')
    ```
 - Add your queue config array to `app.locals.MonitoroQueues`
    ```javascript
    app.locals.MonitoroQueues = queueConfigArray
    ```
    where queueConfigArray is an array of queue config objects of type
    ```json
    {
        "name": "<name of the bull queue>",
        "url": "<url to the redis instance>"
    }
    ```
    For an example queueConfigArray check `server/devServer.js`
    
 - Use the module as middleware for the route at which you want the dashboard to be available. For example, if I want to make the dashboard available at `/foo` in my Express app, 
    ```javascript
    app.use('/foo',monitoro)
    ```
    subdirectories can also be used:
    ```javascript
    app.use('foo/bar',monitoro)
    ```
 - Check `server/devServer.js` for a simple example of usage
 

## Development
To run it locally for development:
 - clone the repo
 - run `npm run dev:fe` to start the react dev server for the frontend
 - run `npm run dev:server` to start the express dev server
 - Open `http://localhost:3000` in your browser


## Contribution
##### All bug fixes, feature ideas, feedback, etc. are welcome!


## Screenshots
![Screenshot](https://raw.githubusercontent.com/AbhilashJN/monitoro/master/docs/screenshots/ss1.png)

![Screenshot](https://raw.githubusercontent.com/AbhilashJN/monitoro/master/docs/screenshots/ss2.png)

![Screenshot](https://raw.githubusercontent.com/AbhilashJN/monitoro/master/docs/screenshots/ss3.png)

![Screenshot](https://raw.githubusercontent.com/AbhilashJN/monitoro/master/docs/screenshots/ss4.png)

![Screenshot](https://raw.githubusercontent.com/AbhilashJN/monitoro/master/docs/screenshots/ss5.png)