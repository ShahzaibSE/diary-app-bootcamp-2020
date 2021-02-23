import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export const diaryTitlePaperStyles = makeStyles((theme: Theme)=>(
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap"
        }
    }))
)
