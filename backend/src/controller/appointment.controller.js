import { setNewAppointment, updateStatusAppointment } from "../service/appointment.service.js";

export async function createAppointment(req, res) {
    try {
        const appointment = await setNewAppointment(req.body)

        res.json(appointment)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}

export async function cancelAppointment(req, res) {
    try {
        const { cancelCode } = req.body 
        await updateStatusAppointment(cancelCode)

        res.status(204)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}