import { pool } from '../../util/db.js'

export async function insertClient(client) {
    try {
        console.log(client)
        const inserted = await pool.query(
            `INSERT INTO client (name, phone, email) VALUES (?, ?, ?);`,  
            [client.userName, client.phone]
        )
           
        return inserted
    } catch(error) {
        console.log("Fehler bei client:" + error.message)
    }
}