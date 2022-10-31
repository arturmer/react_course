import React, { useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "../pages/About"
import PostIdPage from "../pages/PostIdPage"
import Posts from "../pages/Posts"
import { publicRoutes, privateRoutes } from "../router"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context"
import Loader from "./UI/Loader/Loader"

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    key={route.path}
                    element={<route.component />}
                    path={route.path}
                    exact={route.exact}
                />
            ))}
            <Route path="*" element={<Navigate to="/Posts" replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    element={<route.component />}
                    path={route.path}
                    exact={route.exact}
                />
            ))}
            <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
    )
}

/* <Route path="/about" element={<About />}></Route>
<Route path="/posts" element={<Posts />}></Route>
<Route path="/posts/:id" element={<PostIdPage />}></Route> */

export default AppRouter
