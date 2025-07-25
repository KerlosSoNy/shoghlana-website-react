import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import JobsCard from "../../../components/savedJobs/jobsCard/jobsCard";
import { company_size } from "../../../utils/constant/profile";
import { toast } from "sonner";
import MainLayout from "../../../layout/mainLayout";
import { checkLinkIcon } from "../../company_profile/page";
import Logo from "../../../components/logo/logo";

export default function Company() {
    const { id } = useParams();
    const [data, setData] = useState<any>({})
    useEffect(() => {
        axiosInstance.get(`/companies/${id}`).then((res) => {
            setData(res.data?.data);
        }).catch((error) => {
            toast.error(error?.response?.data?.message, { id: 'add-country' })
        });
    }, [])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
    }, [])
    useEffect(() => {
        if (data?.company_info) {
            axiosInstance.get(`/get-cities-by-country-id/${data?.company_info?.country}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.company_info])

    return (
        <MainLayout>
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[54px] flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden">
                    <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                        <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                        <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                    </div>
                </div>
                <div className="p-6 rounded-xl bg-white -mt-10 relative z-[10] pb-20 lg:pb-6">
                    <div className="flex items-center">
                        {data?.image &&
                            < img
                                src={data?.image ? data?.image : ''}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="rounded-[10px] w-[80px] h-[80px] object-cover absolute end-[10px] top-[25px] mr-4"
                            />
                        }
                        <div className='flex flex-row items-center gap-1'>
                            <h2 className="text-[25.73px] text-[#0055D9] font-bold">{data?.name}</h2>
                            <img src='/assets/icons/verified.svg' width={27} height={27} className='mt-0.5 mx-2' alt='Verified' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 -mt-1'>
                        {/* <span className='text-[#4D6182] text-[14px] mt-1 font-[500] max-w-[400px] line-clamp-2'>{data?.company_info?.about}</span> */}
                        {/* @ts-expect-error Type mismatch */}
                        {data?.company_info?.country && <p className="text-[#4D6182] text-[13px] font-[400] mt-1">{`${cities?.find((city: any) => city.id === data?.company_info?.city)?.name || ''}` || ''}, {`${countries?.find((country: any) => country.id === data?.company_info?.country)?.name}`}</p>}
                        <span className='text-[#4D6182] text-[13px] font-[400]'>{company_size[data?.company_info?.company_size] || ''}</span>
                        <span className='text-[#4D6182] text-[13px] font-[400]'>{data?.company_info?.hiring_title || ''}</span>
                        <div className='flex flex-row divide-x-2 divide-[#4D6182]/20 space-x-2 -ms-2'>
                            {
                                data.industries?.map((industry: any, index: number) => (
                                    <span key={index} className='text-[#4D6182] text-[13px] ps-2 font-[400]'>{industry.name}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row items-center absolute bottom-[27.5px] end-[27px]">
                        <Link to={`mailto:${data?.email || ''}`} className="text-blue-600 flex flex-row items-center gap-2 hover:underline">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3233 8.48561C15.3233 9.45698 15.1448 10.3737 14.7877 11.2352C14.4432 12.0777 13.944 12.8482 13.3159 13.507C12.6866 14.1634 11.9438 14.7006 11.1234 15.0927C10.2456 15.5163 9.28984 15.7545 8.31587 15.7922C8.27323 15.7975 8.23259 15.7995 8.19461 15.7995H7.99474C6.9854 15.7995 6.03535 15.6063 5.1446 15.2212C4.27567 14.85 3.48542 14.3166 2.81611 13.6496C2.1503 12.9821 1.61701 12.1945 1.24447 11.3284C0.856492 10.4312 0.65955 9.46309 0.666178 8.48561C0.666178 7.47561 0.859385 6.52822 1.24447 5.6428C1.61713 4.77645 2.15066 3.9886 2.81678 3.32097C3.48588 2.65404 4.2759 2.12065 5.1446 1.74933C6.0445 1.36177 7.01495 1.16487 7.99474 1.17104H8.19461C8.23259 1.17104 8.27323 1.1737 8.31587 1.1777C9.28961 1.21553 10.2451 1.45367 11.1227 1.87725C11.9615 2.28298 12.6924 2.81131 13.3159 3.46421C13.9402 4.11646 14.4306 4.8733 14.7877 5.7354C15.1448 6.59751 15.3233 7.51425 15.3233 8.48561ZM13.9662 10.8427C14.2618 10.0922 14.4122 9.29229 14.4092 8.48561C14.4092 8.04723 14.3659 7.62084 14.2807 7.20645C14.1984 6.80338 14.0788 6.40883 13.9236 6.02788L14.0948 6.49957C14.0661 6.5089 13.8876 6.55687 13.5591 6.64215C13.2307 6.72876 12.7137 6.81403 12.0088 6.89931C12.0374 7.15648 12.0614 7.41631 12.0808 7.67881C12.1227 8.28543 12.1181 8.89438 12.0668 9.50029C12.0374 9.8334 12.0041 10.1565 11.9662 10.471C12.5191 10.5376 12.9568 10.6069 13.2806 10.6782C13.6044 10.7495 13.8329 10.8048 13.9662 10.8427ZM4.75219 8.48561C4.75219 8.81873 4.76618 9.14252 4.79483 9.45698C4.82347 9.77078 4.86145 10.0806 4.90875 10.385C5.31074 10.3547 5.7132 10.3309 6.11597 10.3138C6.54902 10.2951 7.01871 10.2804 7.52305 10.2711V7.09985C6.63155 7.10166 5.74033 7.06833 4.85146 6.99991C4.82347 7.23776 4.79949 7.48027 4.78017 7.72811C4.76151 7.97595 4.75219 8.22778 4.75219 8.48561ZM8.43779 2.14307V6.19977C8.89255 6.19137 9.34719 6.17693 9.80157 6.15646C10.1855 6.13938 10.5691 6.11561 10.9522 6.08518C10.8455 5.59727 10.7046 5.1175 10.5304 4.64944C10.3791 4.23757 10.1853 3.84258 9.95214 3.47088C9.75438 3.15377 9.51382 2.86546 9.23727 2.6141C8.98077 2.38558 8.71361 2.22769 8.43779 2.14241V2.14307ZM7.52305 2.1564C7.24723 2.24301 6.98074 2.40224 6.72357 2.63542C6.4664 2.8686 6.23056 3.15442 6.01603 3.4922C5.78561 3.86309 5.59192 4.25558 5.43774 4.6641C5.26039 5.12668 5.11721 5.60165 5.00935 6.08518C5.36112 6.11382 5.74687 6.13781 6.16593 6.15646C6.58566 6.17578 7.03737 6.18978 7.52305 6.19977V2.1564ZM7.52305 11.1852C7.05669 11.1945 6.62364 11.2065 6.2239 11.2212C5.82349 11.2352 5.45173 11.2565 5.10929 11.2851C5.22321 11.7422 5.36645 12.1686 5.53768 12.5643C5.7089 12.9594 5.89944 13.3091 6.1093 13.6136C6.3185 13.9187 6.54236 14.1732 6.7802 14.3784C6.99698 14.5708 7.24935 14.7188 7.52305 14.8142V11.1852ZM8.43779 14.8282C8.71416 14.7411 8.9694 14.5974 9.1873 14.4064C9.44678 14.1832 9.67511 13.9262 9.86619 13.6423C10.0754 13.3378 10.2639 12.9854 10.4305 12.5856C10.5971 12.1859 10.7376 11.7522 10.8516 11.2851C10.5184 11.2565 10.1493 11.2352 9.74494 11.2212C9.33987 11.2065 8.90415 11.1945 8.43779 11.1852V14.8282ZM8.43779 10.2711C8.94213 10.2804 9.41116 10.2951 9.84487 10.3138C10.2779 10.3331 10.6757 10.3571 11.0374 10.385C11.0854 10.0806 11.1234 9.77078 11.152 9.45698C11.2032 8.88201 11.2079 8.30384 11.166 7.72811C11.147 7.48006 11.1232 7.2324 11.0947 6.98526C10.733 7.02323 10.3306 7.05188 9.88751 7.0712C9.44447 7.08986 8.96145 7.09985 8.43779 7.09985V10.2711ZM13.7517 5.65679C13.4197 4.98233 12.9698 4.37268 12.4232 3.85663C11.8764 3.3367 11.2431 2.91621 10.5517 2.6141C10.8469 3.03316 11.1087 3.53084 11.3379 4.10646C11.5664 4.68276 11.747 5.31368 11.8802 5.9999C12.4518 5.93328 12.8902 5.86399 13.1947 5.7927C13.4998 5.72075 13.685 5.67611 13.7517 5.65679ZM5.8095 2.47019C5.40976 2.61343 5.03334 2.79198 4.6809 3.00585C4.32959 3.21937 3.99942 3.46588 3.69487 3.74203C3.39041 4.01785 3.11192 4.32032 2.85942 4.64878C2.60804 4.97597 2.39041 5.32776 2.20984 5.69876C2.33376 5.73674 2.55228 5.78471 2.86675 5.842C3.18121 5.89863 3.5996 5.95593 4.12393 6.01322C4.28582 5.28037 4.51434 4.61347 4.81015 4.01319C5.10462 3.41358 5.43841 2.89925 5.8095 2.47019ZM1.88072 6.55687C1.78545 6.86134 1.7115 7.1758 1.65887 7.49959C1.60628 7.82563 1.57999 8.15536 1.58025 8.48561C1.58025 8.89468 1.61623 9.29242 1.68751 9.67817C1.7588 10.0639 1.86606 10.433 2.0093 10.7855C2.15188 10.7568 2.38972 10.7115 2.72351 10.6495C3.05662 10.5876 3.48967 10.5283 4.02333 10.471C3.96603 10.1565 3.92339 9.83274 3.89474 9.49962C3.86608 9.16238 3.85186 8.82407 3.85211 8.48561C3.85211 8.21912 3.85877 7.95196 3.87342 7.68547C3.88742 7.41898 3.9134 7.16181 3.95204 6.91397C3.33244 6.84735 2.85409 6.77806 2.51631 6.70677C2.30249 6.66547 2.09046 6.61546 1.88072 6.55687ZM2.40904 11.6282C2.59959 11.9614 2.81611 12.2732 3.05929 12.5636C3.54337 13.1438 4.12314 13.6368 4.77351 14.0213C5.10117 14.2161 5.44813 14.3764 5.80883 14.4997C5.44303 14.0847 5.13325 13.6235 4.88743 13.1279C4.61627 12.5949 4.39442 12.0047 4.2232 11.3564C3.77549 11.4044 3.40373 11.4544 3.10925 11.507C2.81411 11.5589 2.58027 11.5996 2.40904 11.6282ZM10.5517 14.3565C11.1773 14.0823 11.7558 13.7114 12.266 13.2572C12.7783 12.8025 13.2127 12.2668 13.5518 11.6715C13.3392 11.6184 13.1248 11.5731 12.9089 11.5356C12.5391 11.4706 12.1677 11.4158 11.7949 11.3711C11.6617 11.9707 11.4878 12.5237 11.2733 13.028C11.0797 13.4947 10.8379 13.94 10.5517 14.3565Z" fill="#4D6182" />
                            </svg>
                            {data?.email}
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse lg:flex-row w-[98%] xl:w-[80%] gap-[1%] mx-auto mt-[24px]'>
                <div className='flex flex-col w-[100%] lg:w-[79%]  bg-white rounded-[10px] rounded-b-xl shadow-md overflow-hidden border-[1px] border-black/20 py-[26.22px] px-[33.11px]'>
                    <span className='text-[#001433] text-[20px] font-semibold'>ِAbout Company</span>
                    <div className="ms-2" dangerouslySetInnerHTML={{ __html: data?.company_info?.about }} />
                    {data?.jobs?.length > 0 && <div className=" flex flex-col mt-4">
                        <span className='text-[#001433] text-[20px] font-semibold'>Jobs Shared</span>
                        <div className="mt-2 flex flex-col items-center" >
                            {
                                data?.jobs?.map((job: any, index: number) => {
                                    return (
                                        <JobsCard noActrions key={index} job={job} />
                                    )
                                })
                            }
                        </div>
                    </div>}
                </div>
                <div className='flex flex-col w-[100%] lg:w-[20%]'>
                    <div className='border border-black/20 rounded-[16px] flex flex-col items-center justify-center h-[350px] px-[28px]'>
                        {data?.image ?
                            <img src={data?.image} alt="Profile Image" className='w-[100px] h-[100px] rounded-full object-cover' /> :
                            <Logo isDisabled />
                        }
                        <span className='font-semibold text-[20px] xl:text-[26px] text-main text-center mb-2'>{data?.name}</span>
                        <div className='flex flex-row flex-wrap items-center justify-center gap-3 mt-2'>
                            {data?.social_media?.length > 0 ?
                                data?.social_media?.map((item: any, index: number) => {
                                    return (
                                        <Link key={index} to={item?.url} target="_blank" className='flex flex-row items-center justify-center gap-3'>
                                            {
                                                checkLinkIcon(item?.platform)
                                            }
                                        </Link>
                                    )
                                }) :
                                <span className='text-[#001433] text-[20px] font-semibold'>No Social Media</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
