import  {createMuiTheme, createStyles, withStyles, makeStyles,Theme, ThemeProvider} from '@material-ui/core/styles';

export const loginStyles = makeStyles((theme: Theme) =>
        createStyles({
            form_control_margin: {
                margin: theme.spacing(1),
            },
        }),
);