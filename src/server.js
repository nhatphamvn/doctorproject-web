import express from 'express'
import initWebRoutes from './routes/web'
import configviewEngine from './configs/viewEngine'
require("dotenv").config();


const PORT = process.env.PORT || 8000
const app = express()

configviewEngine(app)

initWebRoutes(app)


app.listen(PORT,()=>{
    console.log(" JWT backend nodejs "+PORT);

})