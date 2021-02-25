import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "./../../features/diary/diary.slice";
import {setUser} from "./../../features/auth/user.slice";
import {useAppDispatch} from "./../../app_store/store";
import dayjs from 'dayjs';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToApp from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppBar, Icon, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import {Add} from "@material-ui/icons";
import {Routes, Route} from "react-router-dom";
// Components.
import DiaryEntriesList from "./../DiaryEntriesList/DiaryEntriesList";
import Editor from "./../Editor/Editor";
import DiaryTile from "./../DiaryTile/DiaryTile";
// API.
import {http} from "./../../api/index.api";
// Model.
import {Diary} from "./../../models/diary.interface";
import {User} from "./../../models/user.interface";
// Styles 
import {diaryDrawerStyles, createDiaryBtnStyles, createDiaryBtnContainerStyles, drawerAppBarStyles} from "./Diaries.style";


interface Props {
  windows?: () => Window
}

const Diaries:FC<Props> = (props: Props) => {
    const { windows } = props
    // Styles Classes
    const diaryDrawerClasses = diaryDrawerStyles()
    const diaryCreateBtnClasses = createDiaryBtnStyles()
    const diaryCreateBtnContainerClasses = createDiaryBtnContainerStyles()
    const diaryAppBarClasses = drawerAppBarStyles()
    //
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const {diaries} = useSelector((state: RootState)=>state)
    const {user} = useSelector((state:RootState)=>state)
    // For Mobile State.
    const [mobileOpen, setMobileOpen] = useState(false)
    //
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
    }
    //
    useEffect(()=>{
        const fetchDiaries = async () => {
            http.get<null, Diary[]>(`/diaries/${user?.id}`).then((data)=>{
                if (data.length > 0 && data) {
                    const sortByLastUpdated = data.sort((a:any, b: any) => {
                        return new dayjs.Dayjs(b.updatedAt).unix() - new dayjs.Dayjs(a.updatedAt).unix()
                    })
                    dispatch(addDiary(sortByLastUpdated))
                } 
            })
        }
        //
        fetchDiaries()
    },[dispatch, user])
    //
    const createDiary = async () => {
        const result: any = await Swal.mixin({
          input: 'text',
          confirmButtonText: 'Next →',
          showCancelButton: true,
          progressSteps: ['1', '2'],
        }).queue([
          {
            titleText: 'Diary title',
            input: 'text',
          },
          {
            titleText: 'Private or public diary?',
            input: 'radio',
            inputOptions: {
              private: 'Private',
              public: 'Public',
            },
            inputValue: 'private',
          },
        ]);
        if (result.value) {
          const { value } = result;
          const {
            diary,
            user: _user,
          } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
            title: value[0],
            type: value[1],
            userId: user?.id,
          });
          if (diary && user) {
            dispatch(addDiary([diary] as Diary[]));
            dispatch(addDiary([diary] as Diary[]));
            dispatch(setUser(_user));
            return Swal.fire({
              titleText: 'All done!',
              confirmButtonText: 'OK!',
            });
          }
        }
        Swal.fire({
          titleText: 'Cancelled',
        });
      };
    //
    const drawer = (
      <div>
        <Routes>
        {/* Grid for create button  */}
          <Grid container direction="column" alignItems="center" justify="center">
            <Grid item sm={12} md={12} lg={12}>
              {/* <div className={diaryCreateBtnContainerClasses.root}> */}
              {/* <DiaryTile diary={{title:'First Diary', type:'public', entryIds:[]}}/>    */}
              {/* <Route path="/diary/:id"></Route>     */}
              <Route path="/">
                <Button className={diaryCreateBtnClasses.button} variant="contained" color="primary"
                            size="large" endIcon={<Add/>} onClick={createDiary} > Create Diary </Button>
              </Route>          
    
              {/* </div> */}
            </Grid>  
            <Grid sm={12} md={12} lg={12}>
              <DiaryTile diary={{title:'First Diary', type:'public', entryIds:[]}}/>   
            </Grid>
          </Grid>    

          <Divider />
              <Route path="/diary/:id"><DiaryEntriesList/></Route>
          {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
          <Divider />
        </Routes>
      </div>
    );
    //
    const container = window !== undefined ? () => window.document.body : undefined;
    //
    return (
        <div className="diaries">
            <div className={diaryDrawerClasses.root}>
                <CssBaseline />
                <AppBar position="fixed" className={diaryDrawerClasses.appBar}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      className={diaryDrawerClasses.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={diaryDrawerClasses.appBar_text}>
                      Entry #1
                    </Typography>

                    <Tooltip title="Log Out" aria-label="Log Out">
                      <IconButton className={diaryDrawerClasses.log_out_btn}>
                        <ExitToApp/>
                      </IconButton>
                    </Tooltip>  
                  </Toolbar>
                </AppBar>
                <nav className={diaryDrawerClasses.drawer} aria-label="diary-entries-list">
                  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                  <Hidden smUp implementation="css">
                    <Drawer
                      container={container}
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      classes={{
                        paper: diaryDrawerClasses.drawerPaper,
                      }}
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                    >
                      {drawer}
                    </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{
                        paper: diaryDrawerClasses.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      {drawer}
                    </Drawer>
                  </Hidden>
                </nav>
                  <main className={diaryDrawerClasses.content}>
                      <Editor/>
                  </main>
              </div>
        </div>
    )
}

export default Diaries
