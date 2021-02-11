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

const Home:FC = () => {
    return (
       <Grid container>
            <Grid item sm={12} md={8} lg={8}>
                <div style={{paddingTop:5, paddingBottom:5}}>
                    <Editor/>
                </div>
            </Grid>
       </Grid> 
    )
}

export default Home