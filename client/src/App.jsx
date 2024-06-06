import Register from "./pages/Register.jsx"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Root from "./pages/Root.jsx"
const router  = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {path: 'register', element: <Register />}
    ]
  }
])

export default function App(){

  return (
    <RouterProvider router={router} />
  )
}

/*
to do:
add main navigation
add routes
*/