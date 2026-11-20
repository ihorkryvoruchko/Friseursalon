import { selectEmployeesByServiceId, selectEmployeesWithAppointmensByDate } from "../repository/employee.repository.js"

export async function fetchEmployeesByServiceId(serviceId) {
    const employees = await selectEmployeesByServiceId(serviceId)
    
    return employees
}

export async function fetchEmployeesWithAppointmensByDate(date) {
    const employees = await selectEmployeesWithAppointmensByDate(date)
    
    return groupAppointmentsByEmployee(employees)
}

function groupAppointmentsByEmployee(rows) {
  const result = [];
  const indexById = new Map();

  for (const row of rows) {
    let employee = indexById.get(row.id);

    if (!employee) {
      employee = {
        id: row.id,
        name: row.name,
        appointments: [],
      };
      indexById.set(row.id, employee);
      result.push(employee);
    }

    if (row.start_time) {
      employee.appointments.push({
        start_time: row.start_time,
        end_time: row.end_time,
        status: row.status,
      });
    }
  }

  return result;
}