import { twMerge } from "tailwind-merge";

const tableContent = [
  {
    name:"Kathryn Murphy",
    date:"9/4/12",
    logInTime:"02:10pm",
    checkOutTime:"07:59pm",
    totalHrs:"7.50",
    status:"late"
  },
  {
    name:"Kathryn Murphy",
    date:"9/4/12",
    logInTime:"02:10pm",
    checkOutTime:"07:59pm",
    totalHrs:"7.50",
    status:"on time"
  },
  {
    name:"Kathryn Murphy",
    date:"9/4/12",
    logInTime:"02:10pm",
    checkOutTime:"07:59pm",
    totalHrs:"7.50",
    status:"late"
  },
  {
    name:"Kathryn Murphy",
    date:"9/4/12",
    logInTime:"02:10pm",
    checkOutTime:"07:59pm",
    totalHrs:"7.50",
    status:"WFH"
  },
  {
    name:"Kathryn Murphy",
    date:"9/4/12",
    logInTime:"02:10pm",
    checkOutTime:"07:59pm",
    totalHrs:"7.50",
    status:"on time"
  },
]

const LogsTable = () => {
    return (
      <table className="w-full h-full border-collapse table-fixed">
        <thead className="font-light text-slate-500 px-6 py-6 bg-[#F7F8FB] text-sm">
          <tr>
            <th className="font-light p-4 w-1/6 text-left">
              Name
            </th>
            <th className="font-light p-4 w-1/6 text-left">
              Date
            </th>
            <th className="font-light p-4 w-1/6 text-left">
              Log in Time
            </th>
            <th className="font-light p-4 w-1/6 text-left">
              Check out Time
            </th>
            <th className="font-light p-4 w-1/6 text-left">
              Total Hours
            </th>
            <th className="font-light p-4 w-1/6 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-sm capitalize">
          {tableContent.map((data)=>
          {
            const {name,date,logInTime,checkOutTime,totalHrs,status} = data
            return (<tr className="border-b-[0.1rem] border-slate-200/50">
            <td className=" p-3 text-left">
               {name}
            </td>
            <td className=" p-3 text-left">
               {date}
            </td>
            <td className=" p-3 text-left">
              {logInTime}
            </td>
            <td className=" p-3 text-left">
              {checkOutTime}
            </td>
            <td className=" p-3 text-left">
              {totalHrs}
            </td>
            <td className={twMerge([
              "text-left align-middle inline-block m-2 py-[0.3rem] px-2 rounded",
              status === "late" ? "bg-red-200/50 text-red-900":(status === "WFH"?"bg-blue-200/60 text-blue-900" :"bg-green-200/70 text-green-900")
            ])}>
              {status}
            </td>
          </tr>)}
          )}
        </tbody>
      </table>
    );
  };
  
  export default LogsTable;
  
  
