const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
interface NewHiresCardProps{
    name:string,
    join_date:string,
    profileUrl:string
}

const NewHiresCard:React.FC<NewHiresCardProps> = ({
    name,
    join_date,
    profileUrl
}) => {
    const dateArr = join_date.split('-');
    const monthNum = parseInt(dateArr[1])
  return (
    <div className="flex gap-3 items-center justify-center hover:bg-slate-200/20 transition cursor-pointer rounded-md">
      <img src={profileUrl} alt="new-hire-profile-pic" />
      <div>
          <h1 className="text-sm">
              {name}
          </h1>
          <p className="text-sm font-light text-slate-500">
             {months[monthNum]}
          </p>
      </div>
    </div>
  )
}

export default NewHiresCard
