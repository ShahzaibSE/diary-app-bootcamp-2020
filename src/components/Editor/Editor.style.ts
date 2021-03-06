import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { create } from "yup/lib/Reference";

export const editorTextFieldStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            '& > *': {
              margin: theme.spacing(1, 'auto'),
              width: '100%',
              marginTop: 20
            },
        },
    })
)

export const editorTextAreaStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            '& > *': {
                resize:"both",
                margin: theme.spacing(1, 'auto'),
                marginBottom:20
            }
        }
    })
)

export const editorCardStyles = makeStyles((theme: Theme)=>
        createStyles({
            root: {
                paddingTop: 35,
                maxWidth: '100%'
            }
        })
)

export const editorSaveBtn = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                margin: theme.spacing(1, 'auto'),
                width:"100%"
            },
        }),
)