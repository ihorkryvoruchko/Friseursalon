import { state } from './state.js'
import { initServices } from './services.js'
import { initEmployeeAndDate, updateEmployeesForSelectedServices } from './employee.js'
import { updateSlots } from './slots.js'
import { initBookingForm } from './booking.js'

document.addEventListener('DOMContentLoaded', async () => {
  const bookingDetails = document.getElementById('booking-details')
  const clientSection = document.getElementById('client-section')

  const syncClientSectionVisibility = () => {
    if (state.selectedTime) {
      clientSection.classList.remove('hidden')
    } else {
      clientSection.classList.add('hidden')
    }
  }

  const handleEmployeeOrDateChange = async () => {
    state.selectedTime = ''
    syncClientSectionVisibility()
    await updateSlots(syncClientSectionVisibility)
  }

  const handleServicesChange = async () => {
    if (state.selectedServiceIds.length === 0) {
      bookingDetails.classList.add('hidden')
      clientSection.classList.add('hidden')
      state.selectedEmployeeId = null
      state.selectedTime = ''
      return
    }

    bookingDetails.classList.remove('hidden')
    state.selectedTime = ''
    syncClientSectionVisibility()

    await updateEmployeesForSelectedServices()
    await updateSlots(syncClientSectionVisibility)
  }

  initEmployeeAndDate(handleEmployeeOrDateChange)
  initBookingForm()
  await initServices(handleServicesChange)
})