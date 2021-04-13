import React, { FC } from 'react';
import Grid from "@material-ui/core/Grid";
import {Routes, Route} from "react-router-dom";
import Swal from 'sweetalert2';
// API.
import {http} from "./../../api/index.api";
// Features.
import {setUser} from "./../../features/auth/user.slice";
// Components.
import Editor from "./../Editor/Editor";
import DiariesList from "../DiariesList/DiariesList";

const Home:FC = () => {
    return (
       <Grid container>
           <Grid item sm={12} md={12} lg={12}>
               <DiariesList/>
           </Grid>
            {/* <Grid item sm={12} md={12} lg={12}>
                <div style={{paddingTop:5, paddingBottom:5}}>
                    <Editor/>
                </div>
            </Grid> */}
       </Grid> 
    )
}

export default Home