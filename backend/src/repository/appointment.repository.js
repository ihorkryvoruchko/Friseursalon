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

export async function insertNewAppointment(appointment) {
    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()

        const [client] = await connection.query(`INSERT INTO client (name, phone, email) VALUES (?, ?, ?);`, 
            [appointment.client.name, appointment.client.phone, appointment.client.email]
        )
        
        const [appoint] = await connection.query(
            `INSERT INTO appointment (client_id, employee_id, start_time, end_time, status, cancel_code) VALUES (?, ?, ?, ?, ?, ?);`,
            [client.insertId, appointment.employeeId, appointment.startDateTime, appointment.endDateTime, 'gebucht', appointment.cancelCode]
        )

        for (const serviceId of appointment.serviceIds) {
            const [appointmentService] = await connection.query(
                `INSERT INTO appointment_service (appointment_id, service_id) VALUES (?, ?); `,
                [appoint.insertId, serviceId]
            )
        }

        

        await connection.commit()
        
        return appoint

    } catch (err) {
        await connection.rollback()
        console.error('Transaction Failed:', err)
        throw Error("Fehler bei der Buchung")
    } finally {
        connection.release()
    }

}