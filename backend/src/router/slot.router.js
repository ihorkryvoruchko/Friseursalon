import express from "express"
import { getAvailebleTimeSlots } from "../controller/slot.controller.js"

export const slotRouter = express.Router()

slotRouter.get('/slot/employee/:employeeId/date/:date', getAvailebleTimeSlots)