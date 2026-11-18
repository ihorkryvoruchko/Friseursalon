import { selectEmployeesByServiceId } from "../repository/employee.repository.js"

export async function fetchEmployeesByServiceId(serviceId) {
    const employees = await selectEmployeesByServiceId(serviceId)
    
    return employees
}