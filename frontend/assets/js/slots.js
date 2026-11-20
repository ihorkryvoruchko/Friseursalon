import { fetchSlots } from './api.js'
import { state } from './state.js'

export async function updateSlots(onSlotSelected) {
  const wrapper = document.getElementById('slots-wrapper')
  const container = document.getElementById('slots-list')

  if (
    state.selectedServiceIds.length === 0 ||
    !state.selectedEmployeeId ||
    !state.selectedDate
  ) {
    wrapper.classList.add('hidden')
    container.innerHTML = ''
    state.selectedTime = ''
    onSlotSelected()
    return
  }

  wrapper.classList.remove('hidden')
  container.innerHTML = '<p class="info-text">Lade freie Zeiten...</p>'

  const slots = await fetchSlots(
    state.selectedEmployeeId,
    state.selectedDate,
    state.selectedServiceIds
  )

  container.innerHTML = ''

  if (slots.length === 0) {
    container.innerHTML = '<p class="info-text">Keine Termine verfügbar.</p>'
    return
  }

  slots.forEach((slot) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'slot-btn'
    btn.textContent = slot.value.slice(0, 5)
    btn.disabled = !slot.isAvailable

    if (state.selectedTime === slot.value) {
      btn.classList.add('selected')
    }

    btn.addEventListener('click', () => {
      container
        .querySelectorAll('.slot-btn')
        .forEach((el) => el.classList.remove('selected'))
      btn.classList.add('selected')
      state.selectedTime = slot.value
      onSlotSelected()
    })

    container.appendChild(btn)
  })
}