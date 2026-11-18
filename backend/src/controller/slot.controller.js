import { fetchAvailebleTimeSlots } from "../service/slot.service.js";

export async function getAvailebleTimeSlots(req, res) {
    const { employeeId, date } = req.params
    const { service_ids } = req.query
    
    const slots = await fetchAvailebleTimeSlots(employeeId, date, service_ids)
    
    res.json(slots)
}