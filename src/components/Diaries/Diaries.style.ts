import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { teal } from "@material-ui/core/colors";

const drawerWidth = 380;

export const diaryDrawerStyles =  makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
            },
            drawer: {
                [theme.breakpoints.up('sm')]: {
                    width: drawerWidth,
                    flexShrink: 0,
                },
            },
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: drawerWidth,
                }
            },
            appBar_text: {
                paddingLeft: "inherit",
                fontWeight:"bold"
            },
            menuButton: {
                    marginRight: theme.spacing(2),
                    [theme.breakpoints.up('sm')]: {
                    display: 'none',
                },
            },
            // necessary for content to be below app bar
            toolbar: theme.mixins.toolbar,
            drawerPaper: {
                width: drawerWidth,
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
                transform: "scale(0.95)"
            },
        }),
);

export const createDiaryBtnContainerStyles = makeStyles((theme: Theme)=>
        createStyles({
            root:{
                width:"100%"
            }
        })
)

export const createDiaryBtnStyles = makeStyles((theme: Theme)=>
        createStyles({
                button: {
                    margin: theme.spacing(1),
                    fontWeight: 'bold',
                    width: "100%",
                    backgroundColor: teal[300]
                }
        })
)