import React, {useState, FC} from 'react'
import Button from "@material-ui/core/Button"
import {Email, VpnKey, } from "@material-ui/icons"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import {useFormik} from "formik";
// Features.
// Features.
import {setUser} from "./../../features/auth/user.slice";
import {saveToken, setAuthState} from "./../../features/auth/auth.slice";
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
    username: yup.string().required('Please enter your username.'),
    password: yup.string().required('Without a password, "None shall pass!"')
})

const Login: FC = () => {
    const classes = loginStyles()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState<String>('')
    const [password, setPassword] = useState<String>('')
    const dispatch = useAppDispatch()
    // Login formik.
    const login_formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: login_schema,
        onSubmit: (data:any, {resetForm}) => {
            login(data)?.then((res:any) => {
                if (res) {
                    const {user , token} = res
                    dispatch(saveToken(token))
                    dispatch(setUser(user));
                    dispatch(setAuthState(true));
                }
            }).catch((err:any)=>{
                console.log("Signup error")
                console.log(err)
            }).finally(()=>{
                setLoading(false)
                resetForm()
            })
        }
    })

    return (
        <div>
        <form onSubmit={login_formik.handleSubmit} autoComplete="off"> 
         <Grid container direction="column" alignContent="center" alignItems="center" justify="center">
            <Grid item sm={12} md={12} lg={12}> 
            <div className={classes.form_control_margin}>
                 <Grid container spacing={1} alignItems="flex-end"> 
                     <Grid item>
                         <Email/>
                     </Grid> 
                     <Grid item>
                         <TextField id="username" name="username" 
                                    type="text" className={classes.text_field} label="Enter your username" 
                                    value={login_formik.values.username} onChange={login_formik.handleChange}/>
                     </Grid>             
                 </Grid>
                 {login_formik.errors.username ? <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Typography className={classes.validation_text} 
                                    variant="subtitle1">Please enter username</Typography>
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
                                     value={login_formik.values.password} onChange={login_formik.handleChange}/>
                     </Grid>             
                 </Grid>
                 {login_formik.errors.password ? <Grid container spacing={1} alignItems="flex-end">
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
                 <Button className={classes.login_btn} type="submit"
                     variant="contained" 
                     size="large" color="primary">
                     Log In
                 </Button>
             </Grid> 
         </Grid>
        </form>     
     </div>
    )
}

export default Login
