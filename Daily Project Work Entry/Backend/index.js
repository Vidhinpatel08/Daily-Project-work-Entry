const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

// connect with database
connectToMongo();


const app = express()
const port = 5000

// MiddleWare : req, res object handle
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

// Available Routes 
app.use('/api/auth',require('./routers/auth') )
app.use('/api/member',require('./routers/member') )
app.use('/api/project',require('./routers/project') )
app.use('/api/client',require('./routers/client') )


app.listen(port, () => {
  console.log(`Daily Project Work Entry Panel listening at http://localhost:${port}`)
})