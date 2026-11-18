export function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
}

export function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number)

  return hours * 60 + minutes
}

export function getNowDateTimeString() {
  const now = new Date();
 
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
 
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 
  return formattedDateTime;
}