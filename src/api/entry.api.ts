// API using axios config.
import {http} from "./index.api"
// Model.
import {Entry} from "./../models/entry.interface"

export const addEntry = (entry:any) => {
    let entry_requestBody = JSON.parse(entry) as Partial<Entry>
    if (entry_requestBody) {
        return http.post(`/diaries/entry/${entry_requestBody.diaryId}`, entry_requestBody)
    }
}

export const updateEntry = (entry:any) => {
    let entry_requestBody = JSON.parse(entry) as Partial<Entry>
    if (entry_requestBody) {
        return http.put(`/diaries/entry/${entry_requestBody.diaryId}`, entry_requestBody)
    }
}

export const getEntries = (entry:any) => {
    let entry_requestBody = JSON.parse(entry) as Partial<Entry>
    if (entry_requestBody) {
        return http.get(`/diaries/entry/${entry_requestBody.diaryId}`)
    }
}