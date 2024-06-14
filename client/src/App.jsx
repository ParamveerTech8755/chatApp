import Register, {registerAction} from "./pages/Register.jsx"
import Login, {loginAction} from "./pages/Login.jsx"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Root from "./pages/Root.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import {useContext} from "react"
import UserContext from "./store/UserContextProvider.jsx"
import {logoutLoader} from "./pages/logout.js"
import axios from "axios"
import {loader as loaderFn, safeRoute} from "./util.js"
import Chat from "./pages/Chat.jsx"
import Home, {loader as postLoader} from "./pages/Home.jsx"


export default function App(){

    const {userState, setUserState} = useContext(UserContext)

    const router  = createBrowserRouter([
        {
            path: '/',
            errorElement: <ErrorPage />,
            element: <Root />,
            children: [
                {index: true, element: <Home />, loader: postLoader(userState)},
                {path: 'register', element: <Register />, loader: loaderFn(userState), action: registerAction(setUserState)},
                {path: 'login', element: <Login />, loader: loaderFn(userState), action: loginAction(setUserState)},
                {path: 'chat', element: <Chat />},
                {path: 'logout', loader: logoutLoader(setUserState)}
            ]
        }
      ])


  return (
    <RouterProvider router={router} />
  )
}
export {axios}

/*
to do:
add main navigation
add routes
*/