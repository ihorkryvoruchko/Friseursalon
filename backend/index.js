import express from 'express'
import { userRouter } from './src/router/user.router.js'
import cors from 'cors'
import "dotenv/config"


const app = express()
const PORT = process.env.PORT || 3000
const VERSION = '/api/v1'

app.use(cors())
app.use(express.json())

app.use(VERSION, userRouter)

app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`)
})