import { selectAllServices } from "../repository/service.repository.js"

export async function fetchAllServices() {
    const services = await selectAllServices()
    
    return services
}