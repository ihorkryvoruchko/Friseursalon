import { fetchEmployeeSchedule } from './salon-api.js'
import { salonState } from './salon-state.js'

const DEFAULT_HOURS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
]

function extractTimePart(value) {
  if (!value) {
    return ''
  }
  const str = String(value)
  const timeMatch = str.match(/(\d{2}:\d{2})/)
  return timeMatch ? timeMatch[1] : ''
}

function normalizeStatusClass(status) {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'done' || normalized === 'erledigt' || normalized === 'completed') {
    return 'status-done'
  }
  if (normalized === 'cancelled' || normalized === 'storniert' || normalized === 'canceled') {
    return 'status-cancelled'
  }
  return 'status-booked'
}

function getEmployeeAppointments(employee) {
  if (Array.isArray(employee.appointments)) {
    return employee.appointments
  }
  if (Array.isArray(employee.bookings)) {
    return employee.bookings
  }
  return []
}

function buildAppointmentCard(appt) {
  const statusClass = normalizeStatusClass(appt.status)
  const serviceName =
    appt.serviceName ||
    appt.service_name ||
    (Array.isArray(appt.services) ? appt.services.map((s) => s.name).join(', ') : '') ||
    'Termin'
  const clientName = appt.clientName || appt.client_name || appt.client?.name || ''
  const clientPhone = appt.clientPhone || appt.client_phone || appt.client?.phone || ''
  const startHm = extractTimePart(appt.startDateTime || appt.startTime || appt.start_time)
  const endHm = extractTimePart(appt.endDateTime || appt.endTime || appt.end_time)

  const timeRange = startHm && endHm ? `${startHm}–${endHm}` : startHm
  const metaParts = [timeRange, clientPhone].filter(Boolean)
  const titleText = clientName ? `${serviceName} · ${clientName}` : serviceName

  return `
    <div class="appt-card ${statusClass}">
      <div class="appt-title">${titleText}</div>
      ${metaParts.length > 0 ? `<div class="appt-meta">${metaParts.join(' · ')}</div>` : ''}
    </div>
  `
}

export async function renderScheduleForDate(date) {
  const container = document.getElementById('schedule-container')
  container.innerHTML = '<p class="info-msg">Lade Termine...</p>'

  try {
    const data = await fetchEmployeeSchedule(date)
    const employees = Array.isArray(data) ? data : data.employees || []
    salonState.scheduleData = employees

    if (employees.length === 0) {
      container.innerHTML = '<p class="info-msg">Keine Mitarbeiter oder Termine für diesen Tag gefunden.</p>'
      return
    }

    const headerCells = employees
      .map((emp) => `<th>${emp.name || emp.employee_name || 'Mitarbeiter'}</th>`)
      .join('')

    const rowsHtml = DEFAULT_HOURS.map((hour) => {
      const cellsHtml = employees
        .map((emp) => {
          const appts = getEmployeeAppointments(emp).filter((appt) => {
            const startHm = extractTimePart(
              appt.startDateTime || appt.startTime || appt.start_time
            );
            return startHm === hour;
          })

          const content = appts.map((a) => buildAppointmentCard(a)).join('')
          return `<td class="slot-cell">${content}</td>`
        })
        .join('')

      return `
        <tr>
          <td class="time-col">${hour}</td>
          ${cellsHtml}
        </tr>
      `;
    }).join('')

    container.innerHTML = `
      <table class="schedule-table">
        <thead>
          <tr>
            <th class="time-col"></th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `
  } catch (error) {
    container.innerHTML = `<p class="info-msg">${error.message}</p>`
  }
}