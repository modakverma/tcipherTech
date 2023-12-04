import React from "react";
import { twMerge } from "tailwind-merge";
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface ApprovalRequestsCardProps{
    index:number,
    title:string,
    date:string,
    day:string,
    profileUrl:string
}

const ApprovalRequestsCard:React.FC<ApprovalRequestsCardProps> = ({
    index,
    title,
    date,
    day,
    profileUrl
}) => {
 const dateArr = date.split('-');
 const monthNum = parseInt(dateArr[1])
  return (
    <div className={
        twMerge([
            "flex flex-row justify-between items-center py-4 ",
            index !== 2 && "border-b-[0.1rem] border-slate-200"
        ])
    }>
        <div className="flex gap-3 items-center">
            <img src={profileUrl} 
            alt="approval-req-person-img rounded-full"
            className=""
            />
            <div>
                <h1>{title}</h1>
             <p className="text-base text-slate-500 font-light uppercase">{`${day} ${dateArr[0]},${months[monthNum-1]} ${dateArr[2]}`}</p>
            </div>
            </div>
            <span className="hover:bg-gray-200/20 transition rounded-lg py-2 px-4 cursor-pointer text-sm text-[#725FFE]">
            Review Document
            </span>
        </div>
  )
}

export default ApprovalRequestsCard
