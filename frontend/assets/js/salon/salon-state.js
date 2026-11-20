export function getTodayIsoDate() {
  return new Date().toISOString().split('T')[0]
}

export const salonState = {
  selectedDate: getTodayIsoDate(),
  scheduleData: [],
}