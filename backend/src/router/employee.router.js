import express from "express"
import { getEmployeesByServiceId, getEmployeesWithAppointmensByDate } from "../controller/employee.controller.js"

export const employeeRouter = express.Router()

employeeRouter.get('/employee/service/:serviceId', getEmployeesByServiceId)

employeeRouter.get('/employee/date/:date', getEmployeesWithAppointmensByDate)