import { twMerge } from "tailwind-merge"

interface ContainerProps {
    children: React.ReactNode,
    className?:string,
    type: "leveled" | "plain"
}

const Container: React.FC<ContainerProps> = ({
    className,
    children,
    type
}) => {
    
  return (
   <div className={twMerge([
      "z-30 bg-white rounded-lg p-4",
      type && "relative",
      className,
   ])}>
       {children}
    {
    type ==="leveled" && <div className="bg-white/50 -z-10 left-[0.5rem] right-[0.5rem] h-[2.5rem] absolute -bottom-[0.6rem] rounded-xl">
    </div>
    }
   </div>
  )
}

export default Container
