import { setNewAppointment } from "../service/appointment.service.js";

export async function createAppointment(req, res) {
    const appointment = await setNewAppointment(req.body)
    
    res.json(appointment)
}