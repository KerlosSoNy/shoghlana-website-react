import { useEffect, useState } from "react";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import Footer from "../../components/footer/footer";
import JobsCard from "../../components/savedJobs/jobsCard/jobsCard";
import axiosInstance from "../../utils/axiosInstance";

export default function Saved() {
    const [data, setData] = useState<any>({})
    useEffect(() => {
        axiosInstance.get('/saved-jobs').then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.error(err);
        })
    }, [])
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className='w-[98%] xl:w-[80%] min-h-[60vh] mx-auto mt-[20px] xl:mt-[54px] '>
                <span className='font-[700] text-[28px] '>{data?.data?.length} Active Saved Job</span>
                <div className=' mx-auto gap-4 mt-[20px] xl:mt-[54px] flex flex-col'>
                    {
                        data?.data?.length > 0 ? data?.data?.map((job, index) => {
                            return (
                                <JobsCard key={index} job={job} />
                            )
                        }) :
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-lg">No saved jobs found.</p>
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
