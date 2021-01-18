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
            <Router>
                <Routes>
                    <Route path="/">
                        <Suspense fallback={<p>Loading...</p>}>
                            {isLoggedIn ? <Home /> : <Auth />}
                        </Suspense>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default AppContainer
