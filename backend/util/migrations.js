import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runMigrations() {
    try {
        console.log('Migrations Ausführung...')

        const schemaSql = fs.readFileSync(path.join('./database/', 'migration.sql'), 'utf8')

        await pool.query(schemaSql)
        console.log('Migrations wurden erfolgreich ausgeführt.')

        process.exit(0)
    } catch (error) {
        console.error('Fehler bei Migration:', error)
        process.exit(1)
    }
}

runMigrations()