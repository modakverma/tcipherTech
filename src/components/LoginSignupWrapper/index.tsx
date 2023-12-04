import DashBannerImg from "./DashboardBannerImg"
import starsUrl from '../../assets/images/login-signup/stars.png'
interface WrapperComponentProps {
  children: React.ReactNode;
}
const LoginSignupWrapper:React.FC<WrapperComponentProps>  = ({ children })=> {
  return (
    <div className="
    relative
    h-full
    w-full
    overflow-y-auto
    bg-gradient-to-bl
    from-[#A25BFB]
    to-[#6039FF]
    flex
    ">
      <div className="
      flex
      flex-row
      w-full
      lg:w-[45%] 
      h-full 
      bg-[#FFF]
      ">
    {/* === HERE WE RENDER OUR CONTENT === */}
    {children}
    </div>
    <div className="
      overflow-hidden
      hidden
      lg:block
      relative 
      w-[55%] 
      h-screen 
      bg-red-400
      bg-radial-pattern
      ">
    </div>
      <div className="pl-10
      pt-10
      flex-col 
      h-full
      w-[55%]
      hidden  
      lg:flex 
      absolute 
      top-0
      right-0
      overflow-hidden">
         <div className="flex flex-col gap-2 text-white mb-8">
           <img className="w-24" src={starsUrl} alt="stars-img" />
           <h1 className="font-large text-2xl lg:text-3xl xl:text-4xl  whitespace-nowrap">Driving Digital Transformation
           <h1> through bespoke software development</h1>
           </h1>
           <h1 className="text-md font-light whitespace-nowrap">Try our proven LinkedIn automation software and get quality leads 
           <h1>every day like our 2000+ users do</h1>
           </h1>
         </div>
      </div>
      <div className="hidden lg:flex absolute w-[48%] right-0 bottom-0 h-full">
         <div className="absolute w-full  right-0 bottom-0"> 
          <DashBannerImg/>
         </div>
      </div>
    </div>
  )
}

export default LoginSignupWrapper
