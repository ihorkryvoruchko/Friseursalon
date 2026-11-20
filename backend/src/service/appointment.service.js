import { insertNewAppointment, patchStatusAppoinmentByCancelCode } from '../repository/appointment.repository.js'
import { minutesToTime, timeToMinutes, getNowDateTimeString } from '../../util/timeMinutesConverter.js'
import { getTotalServiceDurationByIDs } from '../repository/service.repository.js'
import { selectFreeEmployee } from '../repository/employee.repository.js'
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
    
    if (!appointment.hasOwnProperty("employeeId") || appointment.employeeId === null) {
      appointment.employeeId = await getRandomEmployeeId(appointment)
    }

    if(! await checkAppointmentIsAvailable(appointment, startDate, startTime, endTime) || getNowDateTimeString() >= appointment.startDateTime) {
       throw Error("Die Buchung ist leider nicht möglich!")
    }
    
    await insertNewAppointment(appointment)

    return appointment
}

async function getRandomEmployeeId(appointment) {
  const employee = await selectFreeEmployee(appointment.startDateTime, appointment.endDateTime, appointment.serviceIds)
  console.log(employee)
  if (employee.length < 1) {
    throw Error("Leider haben wir keine freie Mitarbeiter!")
  }

  return employee[0].id
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

export async function updateStatusAppointment(cancelCode) {
  try {
    const appointment = await patchStatusAppoinmentByCancelCode(cancelCode)

    return
  } catch (error) {
    throw Error(error.message)
  }
}

