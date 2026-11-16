import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runSeeders() {
    try {
        console.log('Seeders Ausführung...')

        const seedsSql = fs.readFileSync(path.join('./database/', 'seeder.sql'), 'utf8')

        await pool.query(seedsSql)
        console.log('Seeders wurden erfolgreich ausgeführt.')

        process.exit(0)
    } catch (error) {
        console.error('Fehler bei Seeders:', error)
        process.exit(1)
    }
}

runSeeders()