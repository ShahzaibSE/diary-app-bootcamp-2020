import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

export const LoginSignUpContainerStyles = makeStyles((theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
}));