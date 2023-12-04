import { useRoutes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AddOrganisation from "../pages/AddOrganisation";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";
import TimeTable from "../pages/TimeTable";

function Router() {
  const routes: any = [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword/>
    },
    {
      path: "/add-org",
      element:<>
      <Navbar/>
      <AddOrganisation />
      </>
    },
    {
      path: "/time-table",
      element: <>
      <Navbar/>
      <Sidebar/>
      <TimeTable/>
      </>,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ];

  return useRoutes(routes);
}

export default Router;

