import groupUrl from '../../assets/images/dashboard/company-updates-group-pic.png'

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface CompanyUpdatesCardProps{
    title:string,
    description:string,
    date:string
}

const CompanyUpdatesCard:React.FC<CompanyUpdatesCardProps> = ({
    title,
    description,
    date
}) => {
    const dateArr = date.split('-');
    const monthNum = parseInt(dateArr[1])
      return (
    <div className="flex justify-between py-2 items-center hover:bg-slate-200/20 transition cursor-pointer">
      <div className="flex gap-3 items-center">
          <div className="flex flex-col items-center p-[0.2rem] w-12 bg-[#0B1728] text-white font-base rounded-lg">
              <h1>{dateArr[0]}</h1>
              <h1>{months[monthNum-1]}</h1>
          </div>
          <div>
              <h1 className="text-base">{title}</h1>
              <p className="text-slate-500 font-light text-sm">{description}</p>
          </div>
      </div>
      <div>
        <img src={groupUrl} alt="group-pic" />
      </div>
    </div>
  )
}

export default CompanyUpdatesCard
