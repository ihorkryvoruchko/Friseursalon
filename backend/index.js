import express from 'express'
import { serviceRouter } from './src/router/service.router.js'
import cors from 'cors'
import "dotenv/config"


const app = express()
const PORT = process.env.PORT || 3000
const VERSION = '/api/v1'

app.use(cors())
app.use(express.json())

app.use(VERSION, serviceRouter)

app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`)
})