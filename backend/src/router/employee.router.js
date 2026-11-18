import express from "express"
import { getEmployeesByServiceId } from "../controller/employee.controller.js"

export const employeeRouter = express.Router()

employeeRouter.get('/employee/service/:serviceId', getEmployeesByServiceId)