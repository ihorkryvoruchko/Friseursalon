import express from "express"
import { getAllServices } from "../controller/service.controller.js"

export const serviceRouter = express.Router()

serviceRouter.get('/service', getAllServices)