const BASE_URL = 'http://localhost:3000/api/v1'

export async function fetchServices() {
  const response = await fetch(`${BASE_URL}/service`)
  if (!response.ok) {
    throw new Error('Fehler beim Laden der Leistungen')
  }
  return response.json()
}

export async function fetchEmployeesByService(serviceId) {
  const response = await fetch(`${BASE_URL}/employee/service/${serviceId}`)
  if (!response.ok) {
    throw new Error('Fehler beim Laden der Mitarbeiter')
  }
  return response.json()
}

export async function fetchSlots(employeeId, date, serviceIds) {
  const params = new URLSearchParams()
  serviceIds.forEach((id) => params.append('service_ids', id))
  const response = await fetch(
    `${BASE_URL}/slot/employee/${employeeId}/date/${date}?${params.toString()}`
  )
  if (!response.ok) {
    throw new Error('Fehler beim Laden der Zeitfenster')
  }
  return response.json()
}

export async function createAppointment(payload) {
  const response = await fetch(`${BASE_URL}/appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Fehler bei der Buchung')
  }
  return response.json()
}

export function buildCancelUrl(cancelCode) {
  return `${BASE_URL}/appointment/cancel/${cancelCode}`
}