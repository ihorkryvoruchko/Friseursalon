import { salonState } from './salon-state.js'
import { initDateNavigation } from './date-nav.js'
import { renderScheduleForDate } from './schedule.js'

document.addEventListener('DOMContentLoaded', async () => {
  initDateNavigation(async (newDate) => {
    await renderScheduleForDate(newDate)
  })

  await renderScheduleForDate(salonState.selectedDate)
})