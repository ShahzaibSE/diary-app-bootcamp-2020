import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// Prequisites.
import {useSelector} from "react-redux";
import {RootState} from "./../../app_store/rootReducer";

// Lazy components.
const Auth = lazy(()=>import("./../../components/LoginSignUpContainer/LoginSignUpContainer"));
const Home = lazy(()=>import("./../../components/Home/Home"));

const AppContainer = () => {
    const isLoggedIn = useSelector((state:RootState)=>state.auth.isAuthenticated)
    console.log("Auth state - AppContainer")
    console.log(isLoggedIn)
    return (
        <div>
            <Routes>
                <Suspense fallback={<p>Loading..</p>}>
                    <Route path="/" element={isLoggedIn ? <Home/> : <Auth/>}></Route>
                    {/* <Route path="/" element={<h1>Hello Diary</h1>}></Route> */}
                </Suspense>
            </Routes>
        </div>
    )
}

export default AppContainer
