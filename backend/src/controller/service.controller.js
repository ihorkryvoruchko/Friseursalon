import { fetchAllServices } from "../service/service.service.js";

export async function getAllServices(req, res) {
    const services = await fetchAllServices()
    
    res.json(services)
}