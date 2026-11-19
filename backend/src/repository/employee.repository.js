import { pool } from '../../util/db.js'

export async function selectEmployeesByServiceId(serviceId) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM employee e
            LEFT JOIN employee_service es ON es.employee_id = e.id
            WHERE es.service_id = ?`,
            [serviceId]  
        )
        
        return rows
    } catch(error) {
        console.log("Fehler bei employee:" + error.message)
    }
}

export async function selectEmployeesWithAppointmensByDate(date) {
    try {
        const [rows] = await pool.query(
            `SELECT e.*, a.start_time, a.end_time, a.status FROM employee e
            LEFT JOIN appointment a ON a.employee_id = e.id
            WHERE DATE(a.start_time) = ?`,
            [date]  
        )
        
        return rows
    } catch(error) {
        console.log("Fehler bei employee:" + error.message)
    }
}