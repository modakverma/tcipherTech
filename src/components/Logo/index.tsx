import { twMerge } from "tailwind-merge";
import logoUrl from "../../assets/images/logo-latest.svg";

interface logoProp{
  className?: string
}
const Logo:React.FC<logoProp> = ({
  className
}) => {
  return (
    <div>
        <img
          alt="Midone Tailwind HTML Admin Template"
          className={twMerge([
            "w-28",
            className
          ])}
          src={logoUrl}
        />
    </div>
  )
}

export default Logo;