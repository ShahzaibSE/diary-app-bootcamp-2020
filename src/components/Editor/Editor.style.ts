import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const editorTextFieldStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: '50ch',
            },
        },
    })
)

export const editorTextAreaStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            maxWidth: "50rem"
        }
    })
)

export const editorCardStyles = makeStyles((theme: Theme)=>
        createStyles({
            root: {
                maxWidth: '50rem'
            }
        })
)