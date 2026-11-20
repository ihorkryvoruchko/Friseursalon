import { salonState, getTodayIsoDate } from './salon-state.js'

function shiftDate(isoDate, daysDelta) {
  const [year, month, day] = isoDate.split('-').map(Number)
  const dateObj = new Date(Date.UTC(year, month - 1, day + daysDelta))
  return dateObj.toISOString().split('T')[0]
}

export function formatGermanDateTitle(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  const dateObj = new Date(Date.UTC(year, month - 1, day))
  const weekday = dateObj.toLocaleDateString('de-DE', {
    weekday: 'short',
    timeZone: 'UTC',
  })
  const formattedDay = String(day).padStart(2, '0')
  const formattedMonth = String(month).padStart(2, '0')
  return `${weekday} ${formattedDay}.${formattedMonth}.${year}`
}

export function initDateNavigation(onDateChange) {
  const titleEl = document.getElementById('current-date-title')
  const prevBtn = document.getElementById('prev-day-btn')
  const todayBtn = document.getElementById('today-btn')
  const nextBtn = document.getElementById('next-day-btn')

  const renderTitle = () => {
    titleEl.textContent = formatGermanDateTitle(salonState.selectedDate)
  };

  renderTitle()

  prevBtn.addEventListener('click', () => {
    salonState.selectedDate = shiftDate(salonState.selectedDate, -1)
    renderTitle()
    onDateChange(salonState.selectedDate)
  })

  todayBtn.addEventListener('click', () => {
    salonState.selectedDate = getTodayIsoDate()
    renderTitle()
    onDateChange(salonState.selectedDate)
  })

  nextBtn.addEventListener('click', () => {
    salonState.selectedDate = shiftDate(salonState.selectedDate, 1)
    renderTitle()
    onDateChange(salonState.selectedDate)
  })
}