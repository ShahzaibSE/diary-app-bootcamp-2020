import {Request} from "miragejs"
import {Dayjs} from "dayjs"
// Error handlers.
import {handleErrors} from "./../server"
// Models.
import {Diary} from "./../../models/diary.interface"

export const daysjs = new Dayjs()

export const createDiary = (schema: any, req: Request) => {
    try {
        const { title, type, userId } = JSON.parse(req.requestBody) as Partial<Diary>;
        // Checking existing user.
        let exUser = schema.users.findBy({id:userId})
        if(!exUser) {
            return handleErrors(false, "User does not exist")
        }
        const now = daysjs.format()
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
        
    }
    catch{
        return handleErrors(false, "Couldn't update diary")
    }
}