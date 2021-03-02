import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
// Models.
import { User } from "../models/user.interface"
import { Diary } from './../models/diary.interface'
import { Entry } from "./../models/entry.interface"
// Controllers.
import { signUp, login, logOut } from "./controllers/user.controller"
import { addEntry, getEntries, updateEntry } from "./controllers/entry.controller"
import { createDiary, updateDiary, getDiaries } from "./controllers/diary.controller"


export interface AuthResponse {
    token: string;
    user: User;
}

// Error handler.
export const handleErrors:any = (error: any, message = 'An error ocurred') => {
    return new Response(400, undefined, {
      data: {
        message,
        isError: true,
      },
    });
};

// Server.
const mockServer = function(env?: string): Server {
   return new Server({
        environment: env ?? "development",
        models:{
            user: Model.extend({
                diary: hasMany(),

            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo()
            }),
            entry: Model.extend({
                diary: belongsTo()
            })
        },
        factories: {
            user: Factory.extend({
                username: 'test',
                password: 'password',
                email: 'test@email.com',
            })
        },
        routes(){
            // this.get('/diaries/users',(schema:any)=>{
            //     return schema.db.users
            // })
            this.urlPrefix = 'https://diaries.app'
            // User Routes.
            this.post("/auth/create", signUp)
            this.post("/auth/signin", login)
            this.post("/auth/logout", logOut)
            // Diary Routes.
            this.get('/diaries/:id', getDiaries)
            this.post('/diaries', createDiary)
            this.put('/diaries/:id', updateDiary);
            // Entry route.
            this.post('/diaries/entry/:id', addEntry)
            this.post("/diaries/entry/:id", updateEntry)
            this.post("/diaries/entry/:id", getEntries)
        }
    })
}

export default mockServer