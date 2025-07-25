import { useEffect, useState } from "react";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router";

export default function Oldgrantees() {
    const [data, setData] = useState<any>()

    useEffect(() => {
        axiosInstance.get('/company/grantee-status').then((res) => {
            setData(res.data.data)
        })
    }, [])
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <div className="flex flex-col gap-2 p-3">

                    <span className="font-semibold text-[24px]">Old Grantees</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            data?.length > 0 ? data?.map((item: any, index: number) => {
                                return (
                                    <div key={index} className="flex flex-col gap-3 items-start justify-between px-4 py-3 border-b shadow-2xl border-gray-200 rounded-[16px]">
                                        <span className="font-semibold text-[16px]">Cv Unlocks : <span className="text-main">{item?.added_cv_unlocks}</span></span>
                                        <span className="font-semibold text-[16px]">Form 6 : <Link target="_blank" to={item?.form6} className="text-main underline">Click Here To See Documents</Link></span>
                                        <span className="font-semibold text-[16px]">Form 2 : <Link target="_blank" to={item?.form2} className="text-main underline">Click Here To See Documents</Link></span>
                                    </div>
                                )
                            }) : <div className="min-h-[30vh] col-span-2 flex items-center justify-center text-4xl text-main font-bold">No Data</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
