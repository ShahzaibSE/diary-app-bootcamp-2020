import {Request, Response} from "miragejs"
import * as dayjs from "dayjs"
// Models.
import {Diary} from "./../../models/diary.interface"
import {Entry} from "./../../models/entry.interface"
// Error handler.
import {handleErrors} from "./../server"


export const addEntry = (schema: any,req: Request): { diary: Diary; entry: Entry } | Response => {
    try {
      const diary = schema.diaries.find(req.params.id);
      const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;
      const now = dayjs;
      const entry = diary.createEntry({
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
      diary.update({
        ...diary.attrs,
        updatedAt: now,
      });
      return {
        diary: diary.attrs,
        entry: entry.attrs,
      };
    } catch (error) {
      return handleErrors(error, 'Failed to save entry.');
    }
  };
  
  export const getEntries = (schema: any,req: Request): { entries: Entry[] } | Response => {
    try {
      const diary = schema.diaries.find(req.params.id);
      return diary.entry;
    } catch (error) {
      return handleErrors(error, 'Failed to get Diary entries.');
    }
  };
  
  export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try {
      const entry = schema.entries.find(req.params.id);
      const data = JSON.parse(req.requestBody) as Partial<Entry>;
      const now = new dayjs.Dayjs().format()
      entry.update({
        ...data,
        updatedAt: now,
      });
      return entry.attrs as Entry;
    } catch (error) {
      return handleErrors(error, 'Failed to update entry.');
    }
  };
  
