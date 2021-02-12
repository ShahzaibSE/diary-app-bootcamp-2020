import React, {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "./../../features/diary/diary.slice";
import {useAppDispatch} from "./../../app_store/store";
import dayjs from 'dayjs';
// Components.
import DiaryEntriesList from "./../DiaryEntriesList/DiaryEntriesList";
// API.
import {http} from "./../../api/index.api";
// Model.
import {Diary} from "./../../models/diary.interface";


const Diaries:FC = () => {
    const dispatch = useAppDispatch()
    const {diaries} = useSelector((state: RootState)=>state)
    const {user} = useSelector((state:RootState)=>state)
    //
    useEffect(()=>{
        const fetchDiaries = async () => {
            http.get<null, Diary[]>(`/diaries/${user?.id}`).then((data)=>{
                if (data.length > 0 && data) {
                    const sortByLastUpdated = data.sort((a:any, b: any) => {
                        return new dayjs.Dayjs(b.updatedAt).unix() - new dayjs.Dayjs(a.updatedAt).unix()
                    })
                    dispatch(addDiary(sortByLastUpdated))
                } 
            })
        }
        //
        fetchDiaries()
    },[dispatch, user])
    //
    return (
        <div className="diaries">
            
        </div>
    )
}

export default Diaries
