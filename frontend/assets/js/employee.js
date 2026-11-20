import { fetchEmployeesByService } from './api.js'
import { state } from './state.js'

export function initEmployeeAndDate(onSelectionChanged) {
  const select = document.getElementById('employee-select')
  const dateInput = document.getElementById('date-input')

  const today = new Date().toISOString().split('T')[0]
  dateInput.min = today
  dateInput.value = today
  state.selectedDate = today

  select.addEventListener('change', () => {
    state.selectedEmployeeId = select.value ? Number(select.value) : null
    state.selectedTime = ''
    onSelectionChanged()
  })

  dateInput.addEventListener('change', () => {
    state.selectedDate = dateInput.value
    state.selectedTime = ''
    onSelectionChanged()
  })
}

export async function updateEmployeesForSelectedServices() {
  const select = document.getElementById('employee-select')
  const previousEmployeeId = state.selectedEmployeeId

  if (state.selectedServiceIds.length === 0) {
    select.innerHTML = '<option value="">-- Bitte wählen --</option>'
    state.selectedEmployeeId = null
    return
  }

  const lists = await Promise.all(
    state.selectedServiceIds.map((id) => fetchEmployeesByService(id))
  )

  const commonEmployees = lists.reduce((acc, currentList) => {
    const currentIds = new Set(currentList.map((item) => item.employee_id))
    return acc.filter((emp) => currentIds.has(emp.employee_id))
  })

  select.innerHTML = '<option value="">-- Bitte wählen --</option>'

  if (commonEmployees.length === 0) {
    const opt = document.createElement('option')
    opt.value = ''
    opt.textContent = 'Kein Mitarbeiter für alle gewählten Leistungen verfügbar'
    opt.disabled = true
    select.appendChild(opt)
    state.selectedEmployeeId = null
    return
  }

  commonEmployees.forEach((emp) => {
    const option = document.createElement('option')
    option.value = emp.employee_id
    option.textContent = emp.name
    select.appendChild(option)
  })

  const stillAvailable = commonEmployees.some(
    (emp) => emp.employee_id === previousEmployeeId
  )

  if (stillAvailable) {
    select.value = String(previousEmployeeId)
    state.selectedEmployeeId = previousEmployeeId
  } else {
    state.selectedEmployeeId = null
  }
}