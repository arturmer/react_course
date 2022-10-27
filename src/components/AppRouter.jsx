import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "../pages/About"
import PostIdPage from "../pages/PostIdPage"
import Posts from "../pages/Posts"
import { routes } from "../router"

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    element={<route.component />}
                    path={route.path}
                    exact={route.exact}
                />
            ))}
        </Routes>
    )
}

/* <Route path="/about" element={<About />}></Route>
<Route path="/posts" element={<Posts />}></Route>
<Route path="/posts/:id" element={<PostIdPage />}></Route> */

export default AppRouter
