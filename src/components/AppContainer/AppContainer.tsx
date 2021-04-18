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
    return (
        <div>
            {/* <Routes> */}
               {/* <Route path="/" element={ 
                <Suspense fallback={<p>Loading..</p>}>
                    {isLoggedIn ? <Home/> : <Auth/>}
                </Suspense>}>
               </Route>  */}
               {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
               {
                   isLoggedIn ? <Route path="/diary" element={ 
                    <Suspense fallback={<p>Loading..</p>}>
                        <Home/>
                    </Suspense>}>
                   </Route> : <Route path="/" element={ 
                    <Suspense fallback={<p>Loading..</p>}>
                        <Auth/>
                    </Suspense>}>
                   </Route>
               }
            {/* </Routes> */}
        </div>
    )
}

export default AppContainer
