import { fetchAllUsers } from "../service/user.service.js";

export function getAllUsers(req, res) {
    const users = fetchAllUsers()

    res.json(users)
}