import React, {useState, FC} from 'react'
import Button from "@material-ui/core/Button"
import {Email, VpnKey, } from "@material-ui/icons"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
// Features.
import {userSlice} from "./../../features/auth/user.slice";
// API.
import {login} from "./../../api/user.api";
// Model.
import {User} from "./../../models/user.interface";
// Dispatcher.
import {useAppDispatch} from "./../../app_store/store";
// Styles.
import {loginStyles} from "./Login.style"
// Component.
import Home from "./../Home/Home";
import { validateYupSchema } from 'formik';

// Login form schema.
const login_schema = yup.object().shape({
    username: yup.string().required('Please enter a username.')
                    .length(16, "Username has to be 16 characters length."),
    password: yup.string().required('Without a password, "None shall pass!"')
})

const Login: FC = () => {
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
            <form>
            <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
               <Grid item sm={12} md={12} lg={12}> 
                <div className={classes.form_control_margin}>
                    <Grid container spacing={1} alignItems="flex-end"> 
                        <Grid item>
                            <Email/>
                        </Grid> 
                        <Grid item>
                            <TextField className={classes.text_field} label="Enter your Email" 
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
                            <TextField className={classes.text_field} label="Enter your Password" type="password"
                                        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{handleFormField(event,'password')}}/>
                        </Grid>             
                    </Grid>
                </div>
                </Grid>
            </Grid>
            <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
                <Grid item sm={12} md={12} lg={12}> 
                    <Button className={classes.login_btn}
                        variant="contained" 
                        size="large"
                        color="primary">
                        Log In
                    </Button>
                </Grid> 
            </Grid>    
            </form>
        </div>
    )
}

export default Login
