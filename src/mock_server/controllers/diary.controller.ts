import {Request} from "miragejs"
import * as dayjs from "dayjs"
// Error handlers.
import {handleErrors} from "./../server"
// Models.
import {Diary} from "./../../models/diary.interface"


export const createDiary = (schema: any, req: Request) => {
    try {
        const { title, type, userId } = JSON.parse(req.requestBody) as Partial<Diary>;
        // Checking existing user.
        let exUser = schema.users.findBy({id:userId})
        console.log("Check existing user - Diary Controller")
        console.log(exUser)
        if(!exUser) {
            return handleErrors(false, "User does not exist")
        }
        const now = new dayjs.Dayjs().format()
        console.log("Current date")
        console.log(now)
        const diary = exUser.createDiary({
            title,
            type,
            createdAt: now,
            updatedAt: now,
          });
          return {
            user: {
              ...exUser.attrs,
            },
            diary: diary.attrs,
        };
    }
    catch(error){
        return handleErrors(error, 'Failed to create Diary.');
    }
}

export const updateDiary = (schema:any, req:Request) => {
    try {
        const diary = schema.diaries.find(req.params.id)
        const data = JSON.parse(req.requestBody) as Partial<Diary>
        const now = new dayjs.Dayjs().format()
        diary.update(
            {
                ...data,
                updatedAt:now
            }
        )
        return diary.attrs as Diary;
    }
    catch{
        return handleErrors(false, "Couldn't update diary")
    }
}

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try {
      const user = schema.users.find(req.params.id);
      return user.diary as Diary[];
    } catch (error) {
        return handleErrors(error, 'Could not get user diaries.');
    }
};