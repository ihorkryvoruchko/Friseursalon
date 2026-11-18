import { insertNewAppointment } from '../repository/appointment.repository.js'
import { minutesToTime, timeToMinutes } from '../../util/timeMinutesConverter.js'
import { getTotalServiceDurationByIDs } from '../repository/service.repository.js'
import { generateTimeSlots } from './slot.service.js'
import crypto from 'node:crypto'

export async function setNewAppointment(appointment) {
    const totalDuration = await getTotalServiceDurationByIDs(appointment.serviceIds)

    const startDate = String(appointment.startDateTime.split(" ")[0])
    const startTime = String(appointment.startDateTime.split(" ")[1])
    
    const endTime = minutesToTime(
      timeToMinutes(startTime) + Number(totalDuration[0].total_duration)
    )

    appointment.endDateTime = `${startDate} ${endTime}`
    appointment.cancelCode = crypto.randomUUID()
    
    if(! await checkAppointmentIsAvailable(appointment, startDate, startTime, endTime)) {
       throw Error("Appointment is unavailable!")
    }

    appointment = await insertNewAppointment(appointment)

    return appointment
}


async function checkAppointmentIsAvailable(appointment, startDate, startTime, endTime) {
  let slots = await generateTimeSlots(startDate, appointment.employeeId, startTime, endTime)
  let isAvailable = true
  
  for (const slot of slots) {
    if (!slot.isAvailable) {
      return false
    }
  }
  
  return isAvailable
}

