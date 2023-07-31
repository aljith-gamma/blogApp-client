"use client"
import { api } from "@/apis/axios";
import { Navbar } from "@/components/Navbar/Navbar";
import { Avatar, Box, Container, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { IBlogData } from '@/components/Blogs/Blog'
import moment from "moment";
import { fetchSingleBlog } from "@/apis/blog";
import { useRouter } from "next/navigation";

const BlogPage = ({ params }: any) => {
    const { blogId } = params;
    const [blog, setBlog] = useState<IBlogData | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {
        const blog: any = await fetchSingleBlog(blogId);
        setBlog(blog);
    }
    return (
        <Box minH="100vh">
            <Navbar flag={ false } />
            <Box w={["90%", "70%", "70%", "60%"]} mx="auto" py={8} display="flex" flexDir="column" gap={6}>

                <Heading size='xl' fontFamily="body" mt={2} >{ blog?.title }</Heading>

                <Box display="flex" alignItems="center" gap={4} mt={4}>
                    <Box>
                        <Avatar size="md" name={blog?.user.userName} 
                            src={blog?.user?.profile?.avatarUrl ? blog?.user?.profile?.avatarUrl : undefined} 
                        />
                    </Box>
                    <Box>
                        <Text fontSize="18px" onClick={ () => router.push(`/profile/${blog?.user.id}`)} 
                            cursor="pointer"
                        >{ blog?.user.userName }</Text>
                        <Text fontSize="sm" color="gray"> { moment(blog?.createdAt).fromNow() }</Text>
                    </Box>
                </Box>

                <Box w="full" h={["250px","300px","400px","500px"]} borderRadius="md" overflow="hidden">
                    <img src={ blog?.imageUrl } 
                        style={{ width: '100%', height: "100%", objectFit: 'cover'}}
                    />
                </Box>

                <Text fontSize="xl" >{ blog?.description }</Text>
            </Box>
        </Box>
    )
}

export default BlogPage;