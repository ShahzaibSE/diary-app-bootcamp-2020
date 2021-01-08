import  {createMuiTheme, createStyles, withStyles, makeStyles,Theme, ThemeProvider} from '@material-ui/core/styles';

export const LoginSignUpContainerStyles = makeStyles((theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      marginTop:"30%",
      marginBottom:"50%",
      borderRadius: 10,
      opacity: 0.95
    },
}));