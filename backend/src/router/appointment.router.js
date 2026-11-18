import express from "express"
import { createAppointment } from "../controller/appointment.controller.js"

export const appointmentRouter = express.Router()

appointmentRouter.post('/appointment', createAppointment)