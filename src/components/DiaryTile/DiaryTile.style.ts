import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { green, red, blueGrey, grey } from "@material-ui/core/colors";

export const diaryTilePaperStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 20,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: blueGrey[300]
        }
    }))
)

export const diaryTileTitleStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            width: "100%",
            color: "white"
        }
    }))
)


export const diaryTileTotalEntries = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            color: grey[800],
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
            backgroundColor: red[500],
            fontWeight: "bold",
            color: "white"
        }
    }))
)

export const diaryTileViewEntriesBtnStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            backgroundColor: green['A400'],
            fontWeight: "bold",
            color: "white"
        }
    }))
)