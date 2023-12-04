import { twMerge } from "tailwind-merge"
import {SIDEBAR_CATEGORIES} from '../../models/sidebar/index'

type Category = typeof SIDEBAR_CATEGORIES[number]

interface sidebarItemProps{
    category: Category
    handleOpen: ()=> void
    isOpen: boolean,
}
const SidebarItem: React.FC<sidebarItemProps> = ({handleOpen,isOpen,category}) => {
  return (
    <div className="flex"
    >
      <div className={twMerge([
          "relative transition flex gap-[0.5rem] w-full h-full py-2.5 my-1 px-2 rounded-lg cursor-pointer",
          isOpen && "bg-[#F2F6FC] text-black",
          !isOpen && "hover:bg-white/10"
      ])}
      onClick={handleOpen}
      > 
       <img src={category.iconUrl} alt="sidebar-item-icon" />
       {category.label}
      </div>
    </div>
  )
}

export default SidebarItem
