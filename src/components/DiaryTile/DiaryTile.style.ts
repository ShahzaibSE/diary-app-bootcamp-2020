import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export const diaryTilePaperStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap"
        }
    }))
)

// export cont diaryTit