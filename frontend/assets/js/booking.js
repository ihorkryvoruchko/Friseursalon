import { createAppointment, buildCancelUrl } from './api.js'
import { state } from './state.js'

export function initBookingForm() {
  const form = document.getElementById('booking-form')
  const submitBtn = document.getElementById('submit-btn')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (
      state.selectedServiceIds.length === 0 ||
      !state.selectedEmployeeId ||
      !state.selectedDate ||
      !state.selectedTime
    ) {
      return
    }

    const payload = {
      serviceIds: state.selectedServiceIds,
      employeeId: state.selectedEmployeeId,
      startDateTime: `${state.selectedDate} ${state.selectedTime}`,
      client: {
        name: document.getElementById('client-name').value.trim(),
        phone: document.getElementById('client-phone').value.trim(),
        email: document.getElementById('client-email').value.trim(),
      },
    }

    submitBtn.disabled = true
    submitBtn.textContent = 'Wird gebucht...'

    try {
      const result = await createAppointment(payload)
      renderBookingResult(result)
    } catch (error) {
      alert(error.message)
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Termin verbindlich buchen'
    }
  })
}

function renderBookingResult(data) {
  const resultSection = document.getElementById('result-section')
  const resultContent = document.getElementById('booking-result')
  const cancelUrl = buildCancelUrl(data.cancelCode)

  resultContent.innerHTML = `
    <p><strong>Kunde:</strong> ${data.client.name} (${data.client.phone}, ${data.client.email})</p>
    <p><strong>Beginn:</strong> ${data.startDateTime}</p>
    <p><strong>Ende:</strong> ${data.endDateTime}</p>
    <div class="cancel-box">
      <p><strong>Stornierungslink (cancelCode: ${data.cancelCode}):</strong></p>
      <a href="${cancelUrl}" target="_blank" rel="noopener noreferrer">${cancelUrl}</a>
    </div>
  `

  resultSection.classList.remove('hidden')
  resultSection.scrollIntoView({ behavior: 'smooth' })
}