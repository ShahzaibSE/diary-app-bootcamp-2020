import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";

export const diaryTilePaperStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            width: "90%",
            marginTop: 20,
            paddingTop: 20,
            paddingBottom: 20
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
        root: {
            color: "grey",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 auto",
            paddingLeft: 20,
            paddingRight: 20
        }        
    }))
)

export const diaryTileAddEntryBtnStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            backgroundColor: green['A400'],
            color: "white",
            fontWeight: "bold"
        }
    }))
)

export const diaryTileViewEntriesBtnStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            color: "white",
            fontWeight: "bold"
        }
    }))
)