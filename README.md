# Monitoro
Dashboard for monitoring Bull queues, built using Express and React. Can be mounted as middleware in an existing express app.



## Usage
 - Install the module
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
        "name": <name of the bull queue>,
        "url": <url to the redis instance>
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
 - run `npm run dev:fe` to start the react dev server for the frontend
 - run `npm run dev:server` to start the express dev server
 - Open `http://localhost:3000` in your browser

## Contributions
 Suggestions, feedback, ideas are welcome