import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export const diaryTilePaperStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            minWidth: "100%",
            marginTop: 20
        }
    }))
)

export const diaryTileTitleStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            width: "100%"
        }
    }))
)


export const diaryTileTotalEntries = makeStyles((theme: Theme)=>(
    createStyles({
        textConfig: {
            // fontSize: 14
            display:'block'
        }        
    }))
)