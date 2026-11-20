const BASE_URL = 'http://localhost:3000/api/v1'

export async function fetchEmployeeSchedule(date) {
  const response = await fetch(`${BASE_URL}/employee/date/${encodeURIComponent(date)}`)
  if (!response.ok) {
    throw new Error('Fehler beim Laden der Tagesübersicht')
  }
  return response.json()
}