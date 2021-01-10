import  {createMuiTheme, createStyles, withStyles, makeStyles,Theme, ThemeProvider} from '@material-ui/core/styles';

export const loginStyles = makeStyles((theme: Theme) =>
        createStyles({
            form_control_margin: {
                margin: theme.spacing(1),
            },
            login_btn:{
                minWidth: 200,
                marginTop: 30
            },
            text_field: {
                minWidth: 300
            }
        }),
);