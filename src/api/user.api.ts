// API using axios config.
import {http} from "./index.api"
// Models.
import {User} from "./../models/user.interface"

export const login = (user: any) => {
    let login_requestBody = JSON.parse(user) as Partial<User>
    if (login_requestBody){
        return http.post("/auth/signin",login_requestBody)
    }
}

export const signup = (user: any) => {
    let login_requestBody = user as Partial<User>
    if (login_requestBody){
        return http.post("/auth/create",login_requestBody)
    }
}