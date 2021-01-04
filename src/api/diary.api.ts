// API using axios config.
import {http} from "./index.api"
// Model.
import {Diary} from "./../models/diary.interface"

export const createDiary = (diary: any)=>{
    let diary_requestBody = JSON.parse(diary) as Partial<Diary>
    if (diary_requestBody) {
        return http.post('/diaries',diary)
    }
}

export const updateDiary = (diary:any)=>{
    let diary_requestBody = JSON.parse(diary) as Partial<Diary>
    if (diary_requestBody) {
        return http.post(`/diaries/${diary_requestBody.userId}`,diary)
    }
}

export const getDiaries = (diary:any)=>{
    let diary_requestBody = JSON.parse(diary) as Partial<Diary>
    if (diary_requestBody) {
        return http.get(`/diaries/${diary_requestBody.userId}`)
    }
}