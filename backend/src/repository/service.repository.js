import { pool } from '../../util/db.js'

export async function selectAllServices() {
    try {
        const services = await pool.query("SELECT * FROM service;")

        return services
    } catch(error) {
        console.log("Fehler bei services:" + error.message)
    }
}