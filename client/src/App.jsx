import './style.scss';
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';


const queryClient = new QueryClient();
function App(){

  // const currentUser = true;
  const {currentUser} = useContext(AuthContext)
  const {darkMode} = useContext(DarkModeContext);

  const Layout = () => {
    return(
      <div className={`theme-${darkMode ?"dark":"light"}`}>
      {/* <div className="theme-light"> */}
        <Navbar />
        <div style={{display:'flex'}}>
          <Leftbar />
          <div style={{flex:6}}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute> <Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element:<Login />,
    },
  ]);


  return <div>
    <QueryClientProvider  client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </div>;
}

export default App;
