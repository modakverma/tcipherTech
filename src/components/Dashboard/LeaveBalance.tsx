interface LeaveBalanceCardProps{
    employeeData:any
}
const LeaveBalance:React.FC<LeaveBalanceCardProps> = ({employeeData}) => {
  return (
    <div className="flex flex-1 flex-col justify-around ">
      <div className="flex justify-between text-2xl font-medium">
         <div className="flex flex-col gap-2">
           <h1>{employeeData.leave_balance.paidLeaves}</h1>
           <p className="text-sm font-light text-slate-500">Paid leaves</p>
         </div>
         <span className="h-full w-[0.094rem] bg-slate-200"></span>
         <div className="flex flex-col gap-2">
           <h1>{employeeData.leave_balance.sickLeaves}</h1>
           <p className="text-sm font-light text-slate-500">Sick leaves</p>
         </div>
      </div>
      <p className="mt-2 font-normal text-sm">You have used 3 Paid leaves in last 2 weeks</p>
    </div>
  )
}

export default LeaveBalance
