import React, {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "./../../features/diary/diary.slice";
import {setUser} from "./../../features/auth/user.slice";
import {useAppDispatch} from "./../../app_store/store";
import dayjs from 'dayjs';
// Components.
import DiaryEntriesList from "./../DiaryEntriesList/DiaryEntriesList";
// API.
import {http} from "./../../api/index.api";
// Model.
import {Diary} from "./../../models/diary.interface";
import {User} from "./../../models/user.interface";


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
    const createDiary = async () => {
        const result: any = await Swal.mixin({
          input: 'text',
          confirmButtonText: 'Next →',
          showCancelButton: true,
          progressSteps: ['1', '2'],
        }).queue([
          {
            titleText: 'Diary title',
            input: 'text',
          },
          {
            titleText: 'Private or public diary?',
            input: 'radio',
            inputOptions: {
              private: 'Private',
              public: 'Public',
            },
            inputValue: 'private',
          },
        ]);
        if (result.value) {
          const { value } = result;
          const {
            diary,
            user: _user,
          } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
            title: value[0],
            type: value[1],
            userId: user?.id,
          });
          if (diary && user) {
            dispatch(addDiary([diary] as Diary[]));
            dispatch(addDiary([diary] as Diary[]));
            dispatch(setUser(_user));
            return Swal.fire({
              titleText: 'All done!',
              confirmButtonText: 'OK!',
            });
          }
        }
        Swal.fire({
          titleText: 'Cancelled',
        });
      };
    //
    return (
        <div className="diaries">
            
        </div>
    )
}

export default Diaries
