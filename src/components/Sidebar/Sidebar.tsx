import patternUrl from '../../assets/images/dashboard/sidebar-pattern.png'
import Button from '../../base-components/Button'
import SidebarItems from './SidebarItems'


const Sidebar = () => {
  return (
    <div className="absolute hidden lg:flex w-[15rem] h-screen px-6 py-6 bg-[#04032D] text-white flex-col gap-4 overflow-y-auto scrollbar-none">
      <div className='relative pt-16'>
      <SidebarItems/>
      <div className="relative w-full h-[18rem] rounded-lg bg-gradient-to-r from-purple-900 via-purple-850 to-indigo-800 overflow-hidden">
          <div className='p-4 w-full flex flex-col gap-2'>
          <span className='text-xl font-medium'>
          <h1 >Upgrade your</h1>
          <h1>Classwood plan</h1>
          </span>
          <p className='font-extralight text-base text-slate-300'>Pro plan for better results</p>
          <Button className="z-[20] w-[80%] bg-[#EEF2FF] text-black px-6 py-2 rounded-lg mt-2">Buy Now</Button>
          </div>
        <img className='absolute bottom-0' src={patternUrl} alt="card-pattern-img" />
      </div>
      </div>
    </div>
  )
}

export default Sidebar
