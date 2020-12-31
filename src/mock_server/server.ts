import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
// Models.
import { User } from "../models/user.interface"
import { Diary } from './../models/diary.interface'
import { Entry } from "./../models/entry.interface"
// Controllers.
import { signUp, login } from "./controllers/user.controller"
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
const mockServer = function() {
    new Server({
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
            // User Routes.
            this.post("/diaries/users/create", signUp)
            this.post("/diaries/users/signin", login)
            // Diary Routes.
            this.post('/diaries/diary/create', createDiary)
            this.post('/diaries/diary/update', updateDiary)
            this.post('/diaries/diary/list', getDiaries)
            // Entry Routes  
            this.post("/diaries/entry/create", addEntry)
            this.post("/diaries/entry/update", updateEntry)
            this.post("/diaries/entry/list", getEntries)
        }
    })
}

export default mockServer