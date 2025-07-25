import { useEffect, useState } from "react";
import { HttpMethod, useApi } from "../../utils/hooks/useApi";
import axiosInstance from "../../utils/axiosInstance";
import ProfileHeroSection from "../../components/profile/heroSection/profileHeroSection";
import PersonalInformation from "../../components/profile/personalInformation/personalInformation";
import { SkillsAndExperience } from "../../components/profile/skillsOfProfile/skillsOfProfile";
import { useParams } from "react-router";
import { toast } from "sonner";
import ApplyPopup from "../../components/applyPopup";
import MainLayout from "../../layout/mainLayout";


export default function UserProfile() {
    const { id } = useParams()

    const { fetchData, payLoad } = useApi({
        endPoint: `users/${id}`,
        method: HttpMethod.GET,
        withOutToast: true,
        withFormData: true,
    })

    useEffect(() => {
        fetchData()
    }, [])

    const [jobCategory, setJobCategory] = useState([])
    const [countries, setCountries] = useState([])
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])

    const handleUnlockCv = () => {
        axiosInstance.post('/company/cv-unlock', {
            user_id: id
        }).then(() => {
            const cvUrl = payLoad?.data?.data?.seeker?.cv
            if (cvUrl) {
                window.open(cvUrl, '_blank')
                toast.success('CV unlocked successfully')
            } else {
                toast.error('CV URL not found')
            }
            toast.success('CV unlocked successfully')
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-companies' })
            return console.error(err)
        })
    }
    const [isOpen, setIsOpen] = useState(false);
    const handleInvite = () => {
        setIsOpen(true)
    }

    return (
        <MainLayout>
            <div className="mt-[54px]"></div>
            <ProfileHeroSection userData={payLoad?.data?.data && payLoad?.data?.data} isCompany={false} handleInvite={handleInvite} />
            <PersonalInformation handleUnlockCv={handleUnlockCv} jobCategory={jobCategory} countries={countries} userData={payLoad?.data?.data && payLoad?.data?.data} />

            <SkillsAndExperience userData={payLoad?.data?.data && payLoad?.data?.data} />
            <ApplyPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </MainLayout>
    )
}
