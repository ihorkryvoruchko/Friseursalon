import { selectAppointmentByDateAndEmployeeId } from '../repository/appointment.repository.js'
import { getTotalServiceDurationByIDs } from '../repository/service.repository.js'

export async function fetchAvailebleTimeSlots(employeeId, date, serviceIds) {
  console.log(await getTotalServiceDurationByIDs(serviceIds))
    const start = "09:00"
    const end = "18:00"
    const slots = generateTimeSlots(date, employeeId, start, end)
    
    return slots
}

async function generateTimeSlots(date, employeeId, startTime, endTime, stepMinutes = 15) {
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number)

    return hours * 60 + minutes
  }

  const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
  }

  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)
  const slots = []
  const appointments = await selectAppointmentByDateAndEmployeeId(date, employeeId)

  for (let current = start; current + stepMinutes <= end; current += stepMinutes) {
    for (const appointment of appointments) {
      slots.push({
        value: minutesToTime(current),
        isAvailable: current >= timeToMinutes(appointment.start_time) && current < timeToMinutes(appointment.end_time) ? false : true
      })
    }
  }

  return slots
}