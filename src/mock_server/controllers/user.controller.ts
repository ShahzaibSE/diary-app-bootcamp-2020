import {Request} from "miragejs"
import {randomBytes} from "crypto"
// Interface.
import {AuthResponse, handleErrors} from "./../server"
// Model.
import { User } from "./../../models/user.interface"

// Generate token.
const generateToken = () => randomBytes(8).toString('hex')

export const createUser = function(schema:any, request: Request) {
    console.log("User to create")
    console.log(request.requestBody)
    return {
        status: true,
        resCode: 200,
        isError:false,
        message: "User created successfully"
    }
}

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

