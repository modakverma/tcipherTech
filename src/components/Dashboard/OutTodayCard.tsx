import { Divide, LucideArrowBigDown } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OutTodayCardProps{
    profilePic:string,
    name:string,
    dept:string
}

const OutTodayCard: React.FC<{ outTodayData: OutTodayCardProps[] }>  = ({outTodayData }) => {
    const [startIdx,setStartIdx] = useState(0);
    const [endIdx,setEndIdx] = useState(4);
    const len = outTodayData.length;
    const CheckAdditionalLeaves=()=>{
        if(len<=endIdx){
            return 0;
        }
        return len-endIdx;
    }
    const [HRonLeaveCount,setHRonLeaveCount] = useState(0);
    const CheckHRonLeaveCount=()=>{
        let count =0;
        for(const emp of outTodayData){
            if(emp.dept ==='HR'){
                count++;
            }
        }
        setHRonLeaveCount(count);
        return HRonLeaveCount
    }
    useEffect(() => {
        CheckHRonLeaveCount();
    }, [outTodayData]);

    const handleShowMore=()=>{
        if(endIdx<len){
            setStartIdx(endIdx)
            if(endIdx+4 <= len){
                setEndIdx(prev => prev+4)
            }
            else{
                setEndIdx(len)
            }
        }
    }
    const handleShowLess =()=>{
        if(endIdx>0){
            setEndIdx(startIdx)
            if(endIdx-4 >= 0){
                setStartIdx(prev => prev-4)
            }
            else{
                setStartIdx(0)
            }
        }
    }
return (
   <div className="relative flex-col h-full">
        <div className={twMerge([
            `flex py-4 justify-between`,
            endIdx === len && "justify-start pl-2 gap-3"
        ])}>
          {startIdx>0 && <span 
          onClick={handleShowLess}
          className="cursor-pointer flex items-center justify-center bg-white hover:bg-[#1000C3]  hover:text-white transition border-[0.1rem] text-[#1000C3] shadow-lg absolute -top-16 -left-8 w-[2rem] h-[2rem]  rounded-full ">
          &larr;
          </span> 
          }
    {outTodayData.slice(startIdx,endIdx).map((employee)=>{
        return (
        <div className="flex flex-col gap-2 items-center">
            <img className="w-10 rounded-full" src={employee.profilePic} alt="employee-on-leave-pic" />
            <span className="text-sm font-light text-slate-500">{employee.name}</span>
        </div>
        )
    })}
   {CheckAdditionalLeaves()!==0 && 
   <div
   onClick={handleShowMore}
   className="w-10 h-10 text-[12px] font-medium border-[#1000C3] border-2 rounded-full text-[#1000C3] flex items-center justify-center hover:bg-[#1000C3] hover:text-white transition cursor-pointer">
        {`+${CheckAdditionalLeaves()}`}
    </div>
   }
    </div>
   <p className="mt-2 font-normal text-sm">{HRonLeaveCount} employees in HR Department are out today</p>
   </div>
)
}

export default OutTodayCard
