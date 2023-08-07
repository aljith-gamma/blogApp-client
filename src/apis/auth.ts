import { UserSignupData } from "@/app/signup/page";
import { api } from "./axios";
import { UserSigninData } from "@/app/signin/page";


export const signupUser = async (userData: UserSignupData) => {
    try {
        const response = await api({
            url: '/auth/signup',
            method: 'POST',
            data: {...userData}
        })
        return response;
    } catch (err: any) {
        console.log(err?.message);
    }
}

export const signinUser = async (userData: UserSigninData) => {
    try {
        const response = await api({ 
            url: '/auth/signin',
            method: 'POST',
            data: {...userData}
        });
        return response;
    } catch (err: any) {
        console.log(err?.message);
    }
}

export const verifyUser = async (userData: { otp: string, email: string}) => {
    try {
        const response = await api({ 
            url: '/auth/verify-email',
            method: 'POST',
            data: {...userData}
        });
        return response;
    } catch (err: any) {
        console.log(err?.message);
    }
}

export const resendOtp = async (email: string) => {
    try {
        const response = await api({ 
            url: '/auth/resend-otp',
            method: 'POST',
            data: { email }
        });
        return response;
    } catch (err: any) {
        console.log(err?.message);
    }
}