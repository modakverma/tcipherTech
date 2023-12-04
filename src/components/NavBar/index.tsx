import Container from "../../base-components/Container"
import selectionPageIcon from '../../assets/images/dashboard/selection-page-icon.svg'
import { useEffect, useState } from "react"
import Logo from "../Logo"
import notificationIcon from '../../assets/images/dashboard/Notification.svg'
import { useLocation, useNavigate } from "react-router-dom"
import { SIDEBAR_CATEGORIES } from "../../models/sidebar"
import profileImg from '../../assets/images/dashboard/person.png'

const Navbar = () => {
  const [selectionPage,setSelectionPage] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const [name,setName] = useState('name')
  const [designation,setDesignation] = useState('designation')
  useEffect(()=>{
    if(location.pathname !=='/add-org'){
      const index = SIDEBAR_CATEGORIES.findIndex((category)=>category.path === location.pathname)
      const pathLabel = SIDEBAR_CATEGORIES[index].label
      setSelectionPage(pathLabel)
    }
  },[location.pathname])
  const handleNavigate=()=>{
    navigate('/')
  }
  return (
    <div className="z-50 absolute top-5 sm:left-10 left-5 right-5 shadow rounded-xl">
      <Container type="plain" className="bg-opacity-75 backdrop-blur-[0.5rem] py-4 flex  flex-row items-center justify-between rounded-xl px-8">
        <div className="flex gap-[2rem] md:gap-[6rem]">
          <div onClick={handleNavigate}>
          <Logo className="w-24"/>
          </div>
         { 
         location.pathname !=='/add-org' &&
         <div className="cursor-pointer flex gap-2 items-center font-light text-base ">
            <img src={selectionPageIcon} alt="selection-page-icon" />
             <p className="text-sm whitespace-nowrap">seletion page {'>'} {selectionPage} </p>
          </div>}
        </div>
        <div className="flex flex-row gap-4">
          <span className="cursor-pointer rounded-full hover:bg-[#725FFE]/20 hover:border-[0.1rem] border-[#725FFE]/50 w-8 h-8 flex items-center justify-center transition">
            <img src={notificationIcon} alt="notification-icon" />
          </span>
          <div className="border-l-[0.1rem] pl-6 text-md flex gap-4 items-center">
            <img src={profileImg} alt="profile-pic" className="rounded-full" />
           <div>
           <h1 className="font-normal">{name}</h1>
           <p className="uppercase text-slate-500 text-xs font-light">{designation}</p>
           </div>
          </div>
        </div>
      </Container>   
    </div>
  )
}

export default Navbar
