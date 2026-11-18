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