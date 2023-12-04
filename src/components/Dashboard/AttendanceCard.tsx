interface AttendanceCardProps{
  employeeData:any
}

const AttendanceCard:React.FC<AttendanceCardProps> = ({
  employeeData
}) => {
  const dateTimeArr = employeeData.attendance.clockIn.dateTime.split('T')
  const time = dateTimeArr[1];
  const date = dateTimeArr[0];
  const avgHours = employeeData.attendance.avgHrsPerDay;
  const percentage = Math.round(avgHours / (employeeData.attendance.totalHrs)* 100)
  return (
    <div className="flex flex-1 flex-col justify-around">
      <div className="flex flex-row justify-between gap-2 items-center font-medium text-2xl">
      <div className="flex flex-col gap-2">
          <h1>
            {avgHours}
          </h1>
          <p className="uppercase text-xs font-light text-slate-500">
          avg hours/day
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1>
          {`${percentage}%`}
        </h1>
        <p className="uppercase text-xs font-light text-slate-500">
          avg hours/day
        </p>
      </div>
    </div>

<span className="h-[0.094rem] w-full bg-slate-200"></span>

  <div className="flex justify-between items-start">
    <div className="flex flex-col gap-2">
      <h1 className="text-lg">{time}</h1>
      <p className="text-slate-500 text-sm font-extralight">{date}</p>
    </div>
    <span className="text-[#7967FF] font-base text-sm">
        Clock In
    </span>
  </div>
</div>
)
}

export default AttendanceCard
