import { selectAllUsers } from "../repository/user.repository.js"

export function fetchAllUsers() {
    const users = selectAllUsers()
    return users
}