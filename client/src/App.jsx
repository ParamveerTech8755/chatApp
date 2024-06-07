import Register, {registerAction} from "./pages/Register.jsx"
import Login, {loginAction} from "./pages/Login.jsx"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Root from "./pages/Root.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import {useContext} from "react"
import UserContext from "./store/UserContextProvider.jsx"
import {logoutLoader} from "./pages/logout.js"


export default function App(){

    const {setUserState} = useContext(UserContext)

    const router  = createBrowserRouter([
        {
            path: '/',
            errorElement: <ErrorPage />,
            element: <Root />,
            children: [
                {path: 'register', element: <Register />, action: registerAction(setUserState)},
                {path: 'login', element: <Login />, action: loginAction(setUserState)}
            ]
        },
        {path: '/logout', loader: logoutLoader(setUserState)}
      ])


  return (
    <RouterProvider router={router} />
  )
}

/*
to do:
add main navigation
add routes
*/