import {Request} from "miragejs"
import {randomBytes} from "crypto"
// Interface.
import {AuthResponse, handleErrors} from "./../server"
// Model.
import { User } from "./../../models/user.interface"


// Generate token.
const generateToken = () => randomBytes(8).toString('hex')

export const login = (schema: any, req: Request): any => {
    const { username, password } = JSON.parse(req.requestBody);
    const user = schema.users.findBy({ username });
    if (!user) {
      return handleErrors(null, 'No user with that username exists');
    }
    if (password !== user.password) {
      return handleErrors(null, 'Password is incorrect');
    }
    const token = generateToken();
    return {
      user: user.attrs as User,
      token,
    };
};

export const signUp = function(schema:any, request:Request):AuthResponse  {
    const data = JSON.parse(request.requestBody)
    const exUser = schema.users.findBy({ username: data.username });
    if (!exUser) {
        handleErrors(null, 'A user with that username already exists.')
    }
    const user = schema.users.create(data);
    const token = generateToken();
    console.log("User attributes")
    console.log(user.attrs)
    //
    return {
      user: user.attrs as User,
      token,
    };
}

// export const logOut = function(schema:any, request: Request): AuthResponse | Boolean  {
//     const data = JSON.parse(request.requestBody)
//     const exUser = schema.user.findBy({username: data.username})
//     const token = ""
//     if (exUser == null){
//       handleErrors(null, "A user with that username does not exist.")
//       return false
//     }else {
//       return {
//         user: exUser.attr as User,
//         token
//       }
//     }
// }

