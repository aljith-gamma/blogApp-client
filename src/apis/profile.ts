import { api } from "./axios";


export const fetchProfileData = async () => {
    try {
        const res = await api({
            url: '/profile/get',
            method: 'GET'
        })
        return res || {};
    } catch (error) {
        console.log(error);
    }
}

export const updateProfileData = async (profileData: FormData) => {
    try {
        const response = await api({
            url: '/profile/update',
            method: 'POST',
            data: profileData
        })
        // console.log(response);
        return response;
    } catch (error: any) {
        console.log(error);
        return Promise.reject(error?.message);
    }
}