import React, {useState, FC } from 'react';
import Button from "@material-ui/core/Button";
import {Email, VpnKey} from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import * as yup from "yup";
import {useFormik} from "formik";
// Features.
import {setUser} from "./../../features/auth/user.slice";
import {saveToken, setAuthState} from "./../../features/auth/auth.slice";
// API.
import {signup} from "./../../api/user.api";
// Model.
import {User} from "./../../models/user.interface";
// Dispatcher.
import {useAppDispatch} from "./../../app_store/store";
// Styles
import {signUpStyles, snackbarStyles} from "./Signup.style";
// Component.
import Home from "./../Home/Home";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp: FC = () => {
    const classes = signUpStyles()
    const snackbar_classes = snackbarStyles()
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    // Snackbar handlers.
    const handleClick = () => {
        console.log("Open snack bar.")
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    // Formik
    const signup_formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: ''
        },
        validationSchema: yup.object().shape({
            username: yup.string().required('Please enter a username.').max(16, 'Username cannot be longer than 16 characters'),
            password: yup.string().required('Without a password, "None shall pass!"'),
            email: yup.string().required().email('Please provide a valid email address (abc@xy.z)')
        }),
        onSubmit: (data, {resetForm}) => {
            console.log("Attempting to signup.")
            console.log(data)
            signup(data)?.then((res:any) => {
                if (res) {
                    const {user , token} = res
                    dispatch(saveToken(token))
                    dispatch(setUser(user));
                    dispatch(setAuthState(true));
                }
            }).catch((err:any)=>{
                console.log("Signup error")
                console.log(err)
                resetForm()
            }).finally(()=>{
                handleClick()
                setLoading(false)
                resetForm()
            })
        }
    })
    //
    return (
    <div>
        <div>
            <form onSubmit={signup_formik.handleSubmit} autoComplete="off"> 
                <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
                <Grid item sm={12} md={12} lg={12}> 
                <div className={classes.form_control_margin}>
                        <Grid container spacing={1} alignItems="flex-end"> 
                            <Grid item>
                                <AccountCircle/>
                            </Grid> 
                            <Grid item>
                                <TextField id="username" name="username"
                                        type="text" className={classes.text_field} label="Enter your Username" 
                                        value={signup_formik.values.username} onChange={signup_formik.handleChange}/>
                            </Grid>             
                        </Grid>
                        {signup_formik.errors.username ? <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <Typography className={classes.validation_text} 
                                            variant="subtitle1">Please enter username</Typography>
                            </Grid>
                        </Grid> : null}
                    </div>
                    <div className={classes.form_control_margin}>
                        <Grid container spacing={1} alignItems="flex-end"> 
                            <Grid item>
                                <Email/>
                            </Grid> 
                            <Grid item>
                                <TextField  id="email" name="email"
                                            type="text" className={classes.text_field} label="Enter your Email" 
                                            value={signup_formik.values.email} onChange={signup_formik.handleChange}/>
                            </Grid>             
                        </Grid>
                        {signup_formik.errors.email ? <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <Typography className={classes.validation_text}
                                            variant="subtitle1">Please enter E-mail</Typography>
                            </Grid>
                        </Grid> : null}
                    </div>
                    <div className={classes.form_control_margin}>
                        <Grid container spacing={1} alignItems="flex-end"> 
                            <Grid item>
                                <VpnKey/>
                            </Grid> 
                            <Grid item>
                                <TextField  id="password" name="password"
                                            className={classes.text_field} label="Enter your Password" type="password"
                                            value={signup_formik.values.password} onChange={signup_formik.handleChange}/>
                            </Grid>             
                        </Grid>
                        {signup_formik.errors.password ? <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <Typography className={classes.validation_text}
                                            variant="subtitle1">Please enter password</Typography>
                            </Grid>
                        </Grid> : null}
                    </div>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
                    <Grid item sm={12} md={12} lg={12}> 
                        <Button className={classes.signup_btn} type="submit"
                            variant="contained" 
                            size="large"
                            color="secondary">
                            Sign Up
                        </Button>
                    </Grid> 
                </Grid>
            </form>  
       </div>
        { 
            open ? 
             <div className={snackbar_classes.root}>
                    <Alert variant="filled" severity="success">
                            Signed up successfully! Please log in.
                    </Alert>
            </div> :  null
        }
    </div>
    )
}

export default SignUp
