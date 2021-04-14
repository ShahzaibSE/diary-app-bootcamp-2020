import React from 'react';
import {Outlet} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const Diaries = () => {
    return (
        <Grid container>
            <Grid item sm={12} md={12} lg={12}>
                <Outlet/>
            </Grid>
        </Grid>    
        
    )
}

export default Diaries
