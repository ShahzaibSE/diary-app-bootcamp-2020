import  {createMuiTheme, createStyles, withStyles, makeStyles,Theme, ThemeProvider} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

export const signUpStyles = makeStyles((theme: Theme) => createStyles({
    form_control_margin: {
        margin: theme.spacing(1),
    },
    signup_btn:{
        minWidth: 200,
        marginTop: 30
    },
    text_field: {
        minWidth: 300
    },
    anchor_element: {
        textDecoration: "none",
    },
    validation_text: {
        color:red[700]
    }
}))