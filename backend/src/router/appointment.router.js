import express from "express"
import { createAppointment, cancelAppointment } from "../controller/appointment.controller.js"

export const appointmentRouter = express.Router()

appointmentRouter.post('/appointment', createAppointment)

appointmentRouter.get('/appointment/cancel/:cancelCode', cancelAppointment)