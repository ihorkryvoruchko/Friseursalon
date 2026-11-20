import { setNewAppointment, updateStatusAppointment } from "../service/appointment.service.js";

export async function createAppointment(req, res) {
    try {
        const appointment = await setNewAppointment(req.body)

        res.json(appointment)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export async function cancelAppointment(req, res) {
    try {
        const { cancelCode } = req.params 
        await updateStatusAppointment(cancelCode)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}