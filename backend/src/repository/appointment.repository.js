import { pool } from '../../util/db.js'

export async function selectAppointmentByDateAndEmployeeId(date, employeeId) {
    try {
        const [rows] = await pool.query(
            `SELECT TIME(start_time) as start_time, TIME(end_time) as end_time FROM appointment WHERE DATE(start_time) = ? AND employee_id = ? AND status = 'gebucht';`,  
            [date, employeeId]
        )
       
        return rows
    } catch(error) {
        console.log("Fehler bei employee:" + error.message)
    }
}