"use client"

import { fetchSingleBlog } from "@/apis/blog";
import { BlogEditor } from "@/components/BlogEditor/BlogEditor";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IBlogData {
    id: number;
    title: string;
    description: string;
    content: string;
    createdAt: string;
    readTime: string;
    tags: string[];
    category: {
        category: string;
    },
    categoryId: number,
    user: {
        id: string;
        userName: string;
        profile: null | {
            avatarUrl: string;
        }
    }
}

export default function EditBlog({params: { id }}: { params: { id: string}}){
    const [blogData, setBlogData] = useState<IBlogData | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        const response = await fetchSingleBlog(+id, true);
        if(!response){
            router.back();
        }
        setBlogData(response);
    }
    
    return(
        <>
            <Navbar flag={false} />
            <Box w="80%" mx="auto" my={6}>
                { blogData && (
                    <BlogEditor code={ blogData.content }  tagsData={ blogData.tags } flag="UPDATE" blogId={ blogData.id }
                    btnName="Update" categoryId={ String(blogData.categoryId) } title={ blogData.title } description={ blogData.description } /> 
                )}
            </Box>
        </>
    )
} 