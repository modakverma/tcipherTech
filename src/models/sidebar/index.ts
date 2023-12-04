import dashboardIconUrl from '../../assets/images/dashboard/category.png'
import TimeTableIconUrl from '../../assets/images/dashboard/Timetable.png'
import CompanyPolicyUrl from '../../assets/images/dashboard/rulerpen.png'
import MyTeamsUrl from '../../assets/images/dashboard/moneys.svg'
import NewHiresUrl from '../../assets/images/dashboard/calendar.svg'
import StaffUrl from '../../assets/images/dashboard/people.svg'
import TasksUrl from '../../assets/images/dashboard/book1.svg'
import AnalyticsUrl from '../../assets/images/dashboard/notepad2.svg'

export const SIDEBAR_CATEGORIES=[
    {
        label:"Dashboard",
        iconUrl:dashboardIconUrl,
        path:'/'
    },
    {
        label:"Time Table",
        iconUrl:TimeTableIconUrl,
        path:'/time-table'
    },
    {
        label:"Company Policy",
        iconUrl:CompanyPolicyUrl,
        path:'/company-policy'
    },
    {
        label:"My Teams",
        iconUrl:MyTeamsUrl,
        path:'/my-team'
    },
    {
        label:"New Hires",
        iconUrl:NewHiresUrl,
        path:'/new-hires'
    },
    {
        label:"Staff",
        iconUrl:StaffUrl,
        path:'/staff'
    },
    {
        label:"Tasks",
        iconUrl:TasksUrl,
        path:'/tasks'
    },
    {
        label:"Analytics",
        iconUrl:AnalyticsUrl,
        path:'/analytics'
    }
]