const http = require('http')
const express = require('express')
const { setupApiRoutes } = require('./apiServer')
const evelodbConfig = require('./middleware/evelodb-config')
const eveloDB = require('evelodb');
let db
try {
    db = new eveloDB(evelodbConfig)
} catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
}

const data = db.readData('appdata')

const app = express()
const server = http.createServer(app)

// Set up API routes
setupApiRoutes(app)

console.log(data.appName)

// Start the server
server.listen(data.port || '3958', () => {
    console.log(`Server is running on http://localhost:${data.port || '3958'}`)
})


