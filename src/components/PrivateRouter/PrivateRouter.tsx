import { useRouter } from "next/navigation";
import React from "react";


export const PrivateRouter = ( { children }: { children: React.ReactNode } ) => {
    const router = useRouter();
    if (typeof window !== 'undefined'){
        const token = localStorage.getItem('token');
        
        if(token) return children;
        else router.push('/signin');
    }else return children;
}