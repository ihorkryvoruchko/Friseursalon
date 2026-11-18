import { selectAppointmentByDateAndEmployeeId } from '../repository/appointment.repository.js'
import { getTotalServiceDurationByIDs } from '../repository/service.repository.js'
import { minutesToTime, timeToMinutes } from '../../util/timeMinutesConverter.js'

export async function fetchAvailebleTimeSlots(employeeId, date, serviceIds) {
    const serviceDuration = await getTotalServiceDurationByIDs(serviceIds)
    const start = "09:00"
    const end = "18:00"
    const slots = await generateTimeSlots(date, employeeId, start, end)
    
    return checkServiceDuration(serviceDuration, slots)
}

export async function generateTimeSlots(date, employeeId, startTime, endTime, stepMinutes = 15) {
  const slots = []
  const appointments = await selectAppointmentByDateAndEmployeeId(date, employeeId)

  for (let current = timeToMinutes(startTime); current + stepMinutes <= timeToMinutes(endTime); current += stepMinutes) {
    for (const appointment of appointments) {
      let isAvailable = true

      if (current >= timeToMinutes(appointment.start_time) && current < timeToMinutes(appointment.end_time)) {
        isAvailable = false
      }
      slots.push({
        value: minutesToTime(current),
        isAvailable
      })
    }
  }

  return slots
}

export function checkServiceDuration(serviceDuration, slots) {
  const duration = Number(serviceDuration[0].total_duration) || 0;

  for (let i = 0; i < slots.length; i++) {
    let isRangeAvailable = true;
    let j = i;
    let coveredMinutes = 0;

    while (j < slots.length && coveredMinutes < duration) {
      if (!slots[j].isAvailable) {
        isRangeAvailable = false;
        break;
      }

      coveredMinutes += 15;
      j++;
    }

    if (coveredMinutes < duration) {
      isRangeAvailable = false;
    }

    slots[i].isAvailable = isRangeAvailable;
  }

  return slots
}