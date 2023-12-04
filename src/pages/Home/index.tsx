import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import { RootState } from "../../stores/store";
import { UserState } from "../../stores/userSlice";
import Login from "../login";
import Dashboard from "../Dashboard";
import Navbar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar/Sidebar";


const Home = () => {
  const userDetails = useAppSelector<UserState>((state: RootState) => state.user)
  const {pathname} = useLocation();


  if(!userDetails.accessToken && pathname !== "/register") {
    return (
      <>
        <Login/>
      </>
    )
  }

  return(
    <div>
        <Navbar/>
        <Sidebar/>
        <Dashboard/>
    </div>
  )

}

export default Home;