"use client"
import { fetchProfileData } from "@/apis/profile";
import { EditProfile } from "@/components/EditProfile/EditProfile";
import Loader from "@/components/Loader/Loader";
import { Navbar } from "@/components/Navbar/Navbar";
import { UserProfile } from "@/components/UserProfile/UserProfile";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export interface IProfileData {
    firstName: string;
    lastName: string;
    userName: string;
    bio: string;
    avatarUrl: string;
    userId: number;
    user: number;
    followersCount: number;
}

const Profile = ({ params: { id }}: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    let _id = (typeof window !== 'undefined') ? localStorage.getItem('_id') && Number(localStorage.getItem('_id')) : undefined;
    const { isLoading, error, data } = useQuery<Partial<IProfileData>>({
        queryKey: ['profileData'],
        queryFn: async () => {
            const profileData  = await fetchProfileData(id);
            return profileData as Partial<IProfileData>;
        }
    })
    
    if(isLoading) return <Loader />
    if(error) return <h1>Error...</h1>
    return (
        <>  
            <Navbar flag={false} />
            <Toaster />
            { isOpen && <EditProfile  isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } {...data} /> }
            { data && <UserProfile {...data }  onOpen={_id === +id ? onOpen : undefined } id={id} /> }
        </>
    )
}

export default Profile;