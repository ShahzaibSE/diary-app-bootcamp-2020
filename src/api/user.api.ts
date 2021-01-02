// API using axios config.
import {http} from "./index.api"
// Models.
import {User} from "./../models/user.interface"

export const login = (user: any) => {
    let login_requestBody = user as Partial<User>
    console.log("Login credientials")
    console.log(login_requestBody) 
    http.post("/auth/signin",login_requestBody).then((result:any)=> {
        console.log("Login Response")
        console.log(result)
    })
}

export const signup = (user: any) => {
    let login_requestBody = user as Partial<User>
    console.log("Signup user details")
    console.log(login_requestBody) 
    http.post("/auth/create",login_requestBody).then((result:any)=> {
        console.log("Sign up response")
        console.log(result)
    })
}