import React, {useState, FC } from 'react';
import Button from "@material-ui/core/Button";
import {Email, VpnKey} from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as yup from "yup";
import {useFormik} from "formik";
// Features.
import {userSlice} from "./../../features/auth/user.slice";
// API.
import {signup} from "./../../api/user.api";
// Model.
import {User} from "./../../models/user.interface";
// Dispatcher.
import {useAppDispatch} from "./../../app_store/store";
// Styles
import {signUpStyles} from "./Signup.style";
// Component.
import Home from "./../Home/Home";

// Signup form schema.
const login_schema = yup.object().shape({
    username: yup.string().required('Please enter a username.')
                    .length(16, "Username has to be 16 characters length."),
    password: yup.string().required('Without a password, "None shall pass!"'),
    email: yup.string().email('Please provide a valid email address (abc@xy.z)')
})

const SignUp: FC = () => {
    const classes = signUpStyles()
    const [username, setUsername] = useState<String>()
    const [email, setEmail] = useState<String>()
    const [password, setPassword] = useState<String>()
    // Handle Form Control.
    const handleFormField = (event: React.ChangeEvent<HTMLInputElement>, field_name: string) => {
        if (field_name === "email") {
            setEmail(event.target.value)
        }else if (field_name === "password") {
            setPassword(event.target.value)
        }else if (field_name === "username") {
            setUsername(event.target.value)
        }
    }
    // Formik
    const signup_formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: ''
        },
        onSubmit: () => {
            console.log("Submitted")
        },
        validate:()=>{}
    })
    //
    return (
    <div>
       <form onSubmit={signup_formik.handleSubmit}> 
        <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
           <Grid item sm={12} md={12} lg={12}> 
           <div className={classes.form_control_margin}>
                <Grid container spacing={1} alignItems="flex-end"> 
                    <Grid item>
                        <AccountCircle/>
                    </Grid> 
                    <Grid item>
                        <TextField className={classes.text_field} label="Enter your Username" 
                                   value={signup_formik.values.username} onChange={signup_formik.handleChange}/>
                    </Grid>             
                </Grid>
            </div>
            <div className={classes.form_control_margin}>
                <Grid container spacing={1} alignItems="flex-end"> 
                    <Grid item>
                        <Email/>
                    </Grid> 
                    <Grid item>
                        <TextField className={classes.text_field} label="Enter your Email" 
                                    value={signup_formik.values.email} onChange={signup_formik.handleChange}/>
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
                                    value={signup_formik.values.password} onChange={signup_formik.handleChange}/>
                    </Grid>             
                </Grid>
            </div>
            </Grid>
        </Grid>
        <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
            <Grid item sm={12} md={12} lg={12}> 
                <Button className={classes.signup_btn}
                    variant="contained" 
                    size="large"
                    color="secondary">
                    Sign Up
                </Button>
            </Grid> 
        </Grid>
       </form>     
    </div>
    )
}

export default SignUp
