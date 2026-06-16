"use client"
import { useSession } from '@/lib/auth-client';
import { SyncLoader } from 'react-spinners';
import {
  FileText,
  Persons,
  CircleCheck,
  Thunderbolt,
} from "@gravity-ui/icons";
import DashboardStats from '@/components/dashboard/DashboardStats';


const RecruiterDashboardHomePage = () => {
    const {data:session, isPending} = useSession()
    if(isPending){
        return <div> <SyncLoader></SyncLoader> </div>
    }

    const recruiterStats = [
  {
    id: 1,
    title: "Total Job Posts",
    value: "48",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Total Applicants",
    value: "1,284",
    icon: <Persons className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Active Jobs",
    value: "18",
    icon: <Thunderbolt className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Jobs Closed",
    value: "32",
    icon: <CircleCheck className="w-5 h-5" />,
  },
];

    const user = session?.user

    return (
        <div className='px-10'>
            <h2 className='text-4xl font-bold py-10'>Wellcome back, {user?.name}</h2>

            <DashboardStats stats={recruiterStats}  ></DashboardStats>
        </div>
    );
};

export default RecruiterDashboardHomePage;