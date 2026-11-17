import { fetchEmployeesByServiceId } from "../service/employee.service.js";

export async function getEmployeesByServiceId(req, res) {
    const { serviceId } = req.params
    const employees = await fetchEmployeesByServiceId(serviceId)
    
    res.json(employees)
}