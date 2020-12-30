import React from 'react'
import Grid from "@material-ui/core/Grid"
// Components.
import LoginSignUpContainer from "./../LoginSignUpContainer/LoginSignUpContainer"

const GridComponent = () => {
    return (
        <div className="grid_container">
            <Grid container>
                <Grid item sm={12} md={12} lg={12}>
                    <LoginSignUpContainer/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GridComponent
