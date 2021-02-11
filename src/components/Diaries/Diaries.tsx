import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "./../../features/diary/diary.slice";
import {useAppDispatch} from "./../../app_store/store";
import dayjs from 'dayjs';


const Diaries:FC = () => {
    return (
        <div>
            
        </div>
    )
}

export default Diaries
