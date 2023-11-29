const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRouter = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
    origin:process.env.CLIENT_URL,
    method: ['POST','PUT','GET','DELETE'],
    credentials:true
}))
app.use(cookieParser())
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({extended : true}))
dbConnect()
initRouter(app)

app.listen(port, ()=>{
    console.log('Server running on the port'+ port);
})
