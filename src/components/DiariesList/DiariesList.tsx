import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "../../features/diary/diary.slice";
import {setUser} from "../../features/auth/user.slice";
import {useAppDispatch} from "../../app_store/store";
import daysjs from 'dayjs';
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
import {Routes, Route, Outlet, useNavigate} from "react-router-dom";
// Components.
import DiaryEntriesList from "../DiaryEntriesList/DiaryEntriesList";
import Editor from "../Editor/Editor";
import DiaryTile from "../DiaryTile/DiaryTile";
// API.
import {http} from "../../api/index.api";
// Features.
import {clearToken, setAuthState} from "../../features/auth/auth.slice";
import {getUserSelector} from "../../features/auth/user.slice";
// Model.
import {Diary} from "../../models/diary.interface";
import {User} from "../../models/user.interface";
// Styles 
import {diaryDrawerStyles, createDiaryBtnStyles, createDiaryBtnContainerStyles, drawerAppBarStyles} from "./DiariesList.style";
// Component.
import Diaries from "../Diaries/Diaries";


const DiariesList:FC = () => {
    // Styles Classes
    const diaryDrawerClasses = diaryDrawerStyles()
    const diaryCreateBtnClasses = createDiaryBtnStyles()
    const diaryCreateBtnContainerClasses = createDiaryBtnContainerStyles()
    const diaryAppBarClasses = drawerAppBarStyles()
    //
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const diaries = useSelector((state: RootState)=>state.diaries)
    const user = useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()
    // For Mobile State.
    const [mobileOpen, setMobileOpen] = useState(false)
    //
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
    }
    //
    const logout = ()=>{
      dispatch(clearToken())
      dispatch(setAuthState(false))
      navigate("/")
    }
    //
    useEffect(()=>{
        const fetchDiaries = async () => {
            http.get<null, Diary[]>(`/diaries/${user?.id}`).then((data)=>{
                if (data.length > 0 && data) {
                    console.log("Diaries fetched")
                    console.log(data)
                    const sortByLastUpdated = data.sort((a:any, b: any) => {
                        return daysjs(b.updatedAt).unix() - daysjs(a.updatedAt).unix()
                    })
                    dispatch(addDiary(sortByLastUpdated))
                } 
            })
        }
        //
        fetchDiaries()
        console.log("Diaries after being fetched - Diaries")
        console.log(diaries)
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
          //
          console.log("Diary")
          console.log(diary)
          console.log("User")
          console.log(user)
          console.log("Data from form")
          console.log(value)
          if (diary && user) {
            console.log("Diary and user are not empty")
            dispatch(addDiary([diary] as Diary[]));
            dispatch(addDiary([diary] as Diary[]));
            dispatch(setUser(_user));
            //
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
      <div className="diaries-list">
        {/* Grid for create button  */}
          <Grid container direction="column" alignItems="center" justify="center" alignContent="center">
              <Routes>
                <Route path="/" element={<Diaries/>}>
                  <Route path="/" element={
                    <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
                      <Grid item sm={12} md={12} lg={12}>
                          <Button className={diaryCreateBtnClasses.button} variant="contained" color="primary"
                                      size="large" endIcon={<Add/>} onClick={createDiary} > Create Diary </Button>   
                      </Grid>
                      {diaries.map((diary, index)=>(
                        <Grid item key={index} sm={12} md={12} lg={12}>
                          <DiaryTile key={index} diary={diary}/> 
                        </Grid>
                      ))}
                    </Grid>
                    }>
                    {/* <Route path=":id" element={<h4>Diary Entry #1</h4>}/>   */}
                      <Route path=":id" element={<DiaryEntriesList/>}/>
                  </Route>
                </Route>
              </Routes> 
                  {/* <Divider />
                      <Route path="/diary/:id" element={<DiaryEntriesList/>} /> */}
          </Grid>
      </div>
    );
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
                      <IconButton className={diaryDrawerClasses.log_out_btn} onClick={logout}>
                        <ExitToApp/>
                      </IconButton>
                    </Tooltip>  
                  </Toolbar>
                </AppBar>
                <nav className={diaryDrawerClasses.drawer} aria-label="diary-entries-list">
                  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                  <Hidden smUp implementation="css">
                    <Drawer
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

export default DiariesList
