import { pool } from '../../util/db.js'

export async function selectAllServices() {
    try {
        const [services] = await pool.query(
            `SELECT * FROM service WHERE status = true;`
            /*`SELECT 
                s.id AS service_id,
                s.name AS service_name,
                s.price AS service_price,
                e.id AS employee_id,
                e.name AS employee_name
            FROM service s
            LEFT JOIN employee_service es ON s.id = es.service_id
            LEFT JOIN employee e ON e.id = es.employee_id;`*/
        )
        
        return services
    } catch(error) {
        console.log("Fehler bei services: " + error.message)
    }
}

export async function getTotalServiceDurationByIDs(serviceIds) {
    try {
        const [services] = await pool.query(
            `SELECT SUM(duration) AS total_duration FROM service WHERE id IN (?);`, [serviceIds]
        )
        
        return services
    } catch(error) {
        console.log("Fehler bei services: " + error.message)
    }
}