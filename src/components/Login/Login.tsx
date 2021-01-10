import React, {useState} from 'react'
import Button from "@material-ui/core/Button"
import {Email, VpnKey} from "@material-ui/icons"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
// Styles.
import {loginStyles} from "./Login.style"

const Login = () => {
    const classes = loginStyles()
    const [email, setEmail] = useState<String>('')
    const [password, setPassword] = useState<String>('')
    // Handle Form Control.
    const handleFormField = (event: React.ChangeEvent<HTMLInputElement>, field_name: string) => {
        if (field_name === "email") {
            setEmail(event.target.value)
        }else if (field_name === "password") {
            setPassword(event.target.value)
        }
    }

    return (
        <div>
            <div className={classes.form_control_margin}>
               <Grid container spacing={1} alignItems="flex-end"> 
                <Grid item>
                    <Email/>
                </Grid> 
                <Grid item>
                    <TextField label="Enter your Email" 
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{handleFormField(event,'email')}}/>
                </Grid>             
               </Grid>
            </div>
            <div className={classes.form_control_margin}>
               <Grid container spacing={1} alignItems="flex-end"> 
                <Grid item>
                    <VpnKey/>
                </Grid> 
                <Grid item>
                    <TextField label="Enter your Password" type="password"
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{handleFormField(event,'password')}}/>
                </Grid>             
               </Grid>
            </div>
            <Button>Log In</Button>
        </div>
    )
}

export default Login
