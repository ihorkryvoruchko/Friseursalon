import { fetchAllServices } from "../service/service.service.js";

export function getAllServices(req, res) {
    const services = fetchAllServices()

    res.json(services)
}