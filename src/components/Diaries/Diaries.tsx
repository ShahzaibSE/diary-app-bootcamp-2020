import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";
import Swal from 'sweetalert2';
import { addDiary } from "./../../features/diary/diary.slice";
import {setUser} from "./../../features/auth/user.slice";
import {useAppDispatch} from "./../../app_store/store";
import dayjs from 'dayjs';
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {Routes, Route} from "react-router-dom";
// Components.
import DiaryEntriesList from "./../DiaryEntriesList/DiaryEntriesList";
import Editor from "./../Editor/Editor";
// API.
import {http} from "./../../api/index.api";
// Model.
import {Diary} from "./../../models/diary.interface";
import {User} from "./../../models/user.interface";
// Styles 
import {diaryDrawerStyles} from "./Diaries.style";


interface Props {
  windows?: () => Window
}

const Diaries:FC<Props> = (props: Props) => {
    const { windows } = props
    const diaryDrawerClasses = diaryDrawerStyles()
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
        <div className={diaryDrawerClasses.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
                    <Typography variant="h6" noWrap>
                      Responsive drawer
                    </Typography>
                  </Toolbar>
                </AppBar>
                <nav className={diaryDrawerClasses.drawer} aria-label="mailbox folders">
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
                    {/* <div className={diaryDrawerClasses.toolbar} /> */}
                      {/* <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                      </Typography>
                      <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                      </Typography> */}
                      <Editor/>
                  </main>
              </div>
        </div>
    )
}

export default Diaries
