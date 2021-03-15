import React from 'react'
import Grid from "@material-ui/core/Grid"
// Components.
import AppContainer from "./../AppContainer/AppContainer";
import {BrowserRouter as Router} from "react-router-dom";

const GridComponent = () => {
    return (
        <div className="grid_container">
            <Grid container>
                <Grid item sm={12} md={12} lg={12}>
                   <Router> 
                    <AppContainer/>
                   </Router> 
                </Grid>
            </Grid>
        </div>
    )
}

export default GridComponent
