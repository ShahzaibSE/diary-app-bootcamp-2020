import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
// Models.
import { User } from "../models/user.interface"
import { Diary } from './../models/diary.interface'
import { Entry } from "./../models/entry.interface"
// Controllers.
import { signUp } from "./controllers/user.controller"


export interface AuthResponse {
    token: string;
    user: User;
}

// Error handler.
export const handleErrors = (error: any, message = 'An error ocurred') => {
    return new Response(400, undefined, {
      data: {
        message,
        isError: true,
      },
    });
};

// Server.
const mockServer = function() {
    new Server({
        models:{
            user: Model
        },
        factories: {
            user: Factory.extend({
                username: 'test',
                password: 'password',
                email: 'test@email.com',
            })
        },
        routes(){
            this.get('/diaries/users',(schema:any)=>{
                return schema.db.users
            })
            // User Routes.
            this.post("/diaries/users/create", signUp)
        }
    })
}

export default mockServer