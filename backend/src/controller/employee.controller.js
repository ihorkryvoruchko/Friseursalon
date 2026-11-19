import { fetchEmployeesByServiceId, fetchEmployeesWithAppointmensByDate } from "../service/employee.service.js";

export async function getEmployeesByServiceId(req, res) {
    const { serviceId } = req.params
    const employees = await fetchEmployeesByServiceId(serviceId)
    
    res.json(employees)
}

export async function getEmployeesWithAppointmensByDate(req, res) {
    const { date } = req.params
    const employees = await fetchEmployeesWithAppointmensByDate(date)
    
    res.json(employees)
}