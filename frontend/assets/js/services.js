import { fetchServices } from './api.js'
import { state } from './state.js'

export async function initServices(onServicesChanged) {
  const container = document.getElementById('services-list')
  const services = await fetchServices()
  state.allServices = services.filter((s) => s.status === 1)

  container.innerHTML = ''

  state.allServices.forEach((service) => {
    const card = document.createElement('div')
    card.className = 'service-item'
    card.dataset.id = service.id

    card.innerHTML = `
      <span class="service-title">${service.name}</span>
      <span class="service-meta">${service.duration} Min. · ${service.price} €</span>
    `

    card.addEventListener('click', () => {
      toggleService(service.id, card)
      renderSummary()
      onServicesChanged()
    })

    container.appendChild(card)
  })
}

function toggleService(serviceId, cardElement) {
  const index = state.selectedServiceIds.indexOf(serviceId)
  if (index === -1) {
    state.selectedServiceIds.push(serviceId)
    cardElement.classList.add('selected')
  } else {
    state.selectedServiceIds.splice(index, 1)
    cardElement.classList.remove('selected')
  }
}

function renderSummary() {
  const summaryEl = document.getElementById('services-summary')
  if (state.selectedServiceIds.length === 0) {
    summaryEl.textContent = ''
    return
  }

  const chosen = state.allServices.filter((s) =>
    state.selectedServiceIds.includes(s.id)
  )
  const totalMinutes = chosen.reduce((sum, s) => sum + Number(s.duration), 0)
  const totalPrice = chosen.reduce((sum, s) => sum + Number(s.price), 0)

  summaryEl.textContent = `Ausgewählt: ${chosen.length} Leistung(en) · Gesamtdauer: ${totalMinutes} Min. · Gesamtpreis: ${totalPrice.toFixed(2)} €`
}