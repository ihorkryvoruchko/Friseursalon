import { selectAllServices } from "../repository/service.repository.js"

export function fetchAllServices() {
    const services = selectAllServices()
    return services
}