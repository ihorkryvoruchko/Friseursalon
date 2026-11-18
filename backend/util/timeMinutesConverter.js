export function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
}

export function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number)

  return hours * 60 + minutes
}