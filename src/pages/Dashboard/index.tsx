import Button from "../../base-components/Button";
import Container from "../../base-components/Container";
import CompanyUpdatesCard from "../../components/Dashboard/CompanyUpdatesCard";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ApprovalRequestsCard from "../../components/Dashboard/ApprovalRequestsCard";
import NewHiresCard from "../../components/Dashboard/NewHiresCard";
import personUrl from '../../assets/images/dashboard/person.png'
import profileUrl from '../../assets/images/dashboard/new-hire-person.svg'
import AttendanceCard from "../../components/Dashboard/AttendanceCard";
import OutTodayCard from "../../components/Dashboard/OutTodayCard";
import LeaveBalance from "../../components/Dashboard/LeaveBalance";
import LogsTable from "../../components/Dashboard/LogsTable";

const dashHeadlineData = {
    "employee_data": {
        employee_id: 123,
        name: "John Doe",
        open_actions: 124,
        attendance: {
            avgHrsPerDay: 6.8,
            totalHrs: 10,
            clockIn: {
                dateTime: "2023-11-24T09:00:00",
                location: "Office A"
            }
        },
        leave_balance: {
            paidLeaves: 8,
            sickLeaves: 12
        }
    },
    "out_today": [
        {
            name: "Suman",
            dept: "Design",
            profilePic: profileUrl
        },
        {
            name: "Revti",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "Iram",
            dept: "HR",
            profilePic: personUrl
        },
        {
            name: "Ashish",
            dept: "Dev",
            profilePic: personUrl
        },
        {
            name: "Anuj",
            dept: "Design",
            profilePic: personUrl
        },
        {
            name: "Amaan",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "John",
            dept: "HR",
            profilePic: personUrl
        },
        {
            name: "Smith",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "Shaggy",
            dept: "HR",
            profilePic: personUrl
        },
        {
            name: "Michel",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "Trevor",
            dept: "HR",
            profilePic: personUrl
        },
        {
            name: "Sneha",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "Haram",
            dept: "HR",
            profilePic: profileUrl
        },
        {
            name: "Abid",
            dept: "HR",
            profilePic: personUrl
        }
    ]
}

const approvalRequestData = [
    {
        title: "Expense Submission",
        date: "14-05-2016",
        day: "SUN",
        profileUrl: personUrl
    },
    {
        title: "Leave Request",
        date: "14-05-2016",
        day: "SUN",
        profileUrl: personUrl
    },
    {
        title: "Timesheet update",
        date: "14-05-2016",
        day: "SUN",
        profileUrl: personUrl
    },
    {
        title: "Timesheet update",
        date: "14-05-2016",
        day: "SUN",
        profileUrl: personUrl
    },
    {
        title: "Timesheet update",
        date: "14-05-2016",
        day: "SUN",
        profileUrl: personUrl
    },
]

const newHiresData = [
    {
        id: 1,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
    {
        id: 2,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
    {
        id: 3,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
    {
        id: 4,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
    {
        id: 5,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
    {
        id: 6,
        name: "Suman Mishra",
        join_date: "12-11-2023",
        profileUrl: profileUrl
    },
]

const companyUpdatesData = {
    "Announcements": [
        {
            id: 1,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-03-2023"
        },
        {
            id: 2,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-01-2023"
        },
        {
            id: 3,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-02-2023"
        },
        {
            id: 4,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-12-2023"
        },
        {
            id: 5,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-07-2023"
        },
        {
            id: 6,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-02-2023"
        },
        {
            id: 7,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-02-2023"
        },
        {
            id: 7,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-02-2023"
        },
        {
            id: 7,
            title: "Inter School Volleyball Selection",
            description: "Selection starts on 20 march 2022 in PT gro",
            date: "18-02-2023"
        },
    ],
    "Birthdays": [

    ],
    "Work Anniversary": [

    ],
    "Next Holiday": [

    ],
}


const Dashboard = () => {
    const employeeData = dashHeadlineData['employee_data']
    const [index, setIndex] = useState(0);
    const numOfApprovalRequest = approvalRequestData.length;
    return (
        <div className="lg:ml-[15rem] relative h-full min-h-screen bg-[#E8EFF8] flex">
            <div className="p-5 bg-[#E8EFF8] h-screen overflow-y-auto flex-1 pt-36 flex flex-col gap-5 pb-10">
                <h1 className="relative font-semibold text-xl">
                    Your Dashboard</h1>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {/* 1 */}
                    <Container type="leveled" className="w-full min-h-[10rem] flex flex-col gap-4">
                        <h1 className="font-normal">Open Actions</h1>
                        <div className="flex gap-3 items-center">
                            <h1 className="text-[#7967FF] font-semibold text-4xl">124</h1>
                            <div className="flex items-center juftify-center relative w-3 h-3 bg-[#E09857] rounded-full">
                            <span className="absolute w-3 h-3 rounded-full animate-ping bg-[#E09857]"></span>
                            </div>
                        </div>
                        <p className="text-slate-600 font-light text-xs">Tasks waiting for you - Leaves, Attendance, Reviews and other approvals </p>
                        <Button className="bg-[#725FFE]/10 py-2 border-dashed border-[1px] border-[#725FFE] text-[#725FFE] text-sm ">Take Action</Button>
                    </Container>
                    {/* 2 */}
                    <Container type="leveled" className="flex w-full min-h-[10rem] flex-col">
                        <h1 className="mb-2 font-normal">Attendance</h1>
                        <AttendanceCard employeeData={employeeData} />
                    </Container>
                    {/* 3 */}
                    <Container type="leveled" className="flex w-full min-h-[10rem] flex-col">
                        <h1 className="mb-2 font-normal">Out today</h1>
                        <OutTodayCard outTodayData={dashHeadlineData["out_today"]} />
                    </Container>
                    {/* 4 */}
                    <Container type="leveled" className="flex w-full min-h-[10rem] flex-col justify-between">
                        <h1 className="mb-3 font-normal">Leave balance</h1>
                        <LeaveBalance employeeData={employeeData} />
                    </Container>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 w-full gap-5">
                    <div className="flex flex-col gap-5">
                        <Container type="plain" className="flex-1 w-full flex flex-col min-h-[18rem] ">
                            <div >
                                <h1 className="font-normal">Request for approval</h1>
                                <p className="text-slate-500 font-light text-sm">{numOfApprovalRequest} pending to review</p>
                            </div>
                            <div className="flex-1 flex flex-col">
                                {
                                    approvalRequestData.slice(0, 3).map((req, idx) => (
                                        <ApprovalRequestsCard index={idx} {...req} />
                                    ))
                                }
                            </div>
                        </Container>
                        <Container type="plain" className="flex flex-col w-full] min-h-[11rem] ">
                            <h1 className="mb-2 font-normal">New Hires</h1>
                            <div className="flex-1 grid grid-cols-3 gap-2">
                                {newHiresData.map((person) =>
                                    <NewHiresCard
                                        key={person.id}
                                        {...person}
                                    />
                                )}
                            </div>
                        </Container>
                    </div>
                    <Container type="plain" className="overflow-y-auto relative w-full h-[34rem]">
                        <div className="bg-white mb-4">
                            <h1 className="mb-2 font-normal">Company Updates</h1>
                            <div className="pt-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                                {Object.keys(companyUpdatesData).map((item, idx) => (
                                    <span
                                        className={twMerge([
                                            "inline-block pb-2 text-center w-40 2xl:w-52 border-b-[0.1rem] border-slate-300/60 cursor-pointer text-slate-400",
                                            index === idx && "text-[#725FFE] border-[#725FFE]"
                                        ])}
                                        onClick={() => setIndex(idx)}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {Object.values(companyUpdatesData)[index].length > 0 ?
                            Object.values(companyUpdatesData)[index].map((update, index) => (
                                <CompanyUpdatesCard key={update.id} {...update} />
                            ))
                            :
                            <h1 className="text-center pt-10 text-slate-400">Nothing to show...</h1>
                        }
                    </Container>
                </div>
                <div>
                    <Container type="plain" className="flex flex-col gap-4 min-h-[15rem]">
                        <h1 className="font-normal">Logs</h1>
                        <LogsTable />
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;