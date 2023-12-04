import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {SIDEBAR_CATEGORIES} from '../../models/sidebar/index'
import SidebarItem from './SidebarItem';

const SidebarItems = () => {
    const [activeIndex,setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
   
  return (
  <div className='flex flex-col gap-3 py-10 w-full'>
  {SIDEBAR_CATEGORIES.map((category,index)=>{
          useEffect(() => {
          const currentPath = location.pathname;
          const initialIndex = SIDEBAR_CATEGORIES.findIndex((category) => category.path ===     currentPath);
          setActiveIndex(initialIndex !== -1 ? initialIndex : null);
          }, [location.pathname]);
          const handleOpen = ( path: string) => {
            navigate(path);
          };
          const isOpen = index === activeIndex
          return (
              <SidebarItem
              handleOpen={() => handleOpen(category.path)}
              category={category} 
              isOpen={isOpen}
              />
          )
  })}
  </div>
  )
}

export default SidebarItems

