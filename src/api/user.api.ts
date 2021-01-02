// API using axios config.
import {http} from "./index.api"
// Models.
import {User} from "./../models/user.interface"

export const login = (user: any) => {
    let login_requestBody = user as Partial<User>
    console.log("Login credientials")
    console.log(login_requestBody) 
}