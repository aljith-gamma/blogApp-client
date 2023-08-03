"use client"
import { Navbar } from "@/components/Navbar/Navbar";
import { Avatar, Box, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchSingleBlog } from "@/apis/blog";
import { useRouter } from "next/navigation";

interface ISingleBlogData {
    category: {
        category: string;
    };
    content: string;
    title: string;
    readTime: string;
    createdAt: string;
    user: {
        id: number;
        profile?: {
            avatarUrl: string;
        },
        userName: string;
    }
}

const BlogPage = ({ params }: any) => {
    const { blogId } = params;
    const [blog, setBlog] = useState<ISingleBlogData | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {
        const blog: any = await fetchSingleBlog(blogId);
        setBlog(blog);
    }
    return (
        <>
            <Navbar flag={ false } />
            <Box minH="100vh" w={["90%", "70%", "70%", "50%"]} mx="auto" py={8}>
                <Heading size="xl">{ blog?.title }</Heading>
                <Box display="flex" alignItems="center" gap={4} my={10}>
                    <Box>
                        <Avatar size="md" name={blog?.user.userName} 
                            src={blog?.user?.profile?.avatarUrl ? blog?.user?.profile?.avatarUrl : undefined} 
                        />
                    </Box>
                    <Box>
                        <Box>
                            <Text fontSize="18px" onClick={ () => router.push(`/profile/${blog?.user.id}`)} 
                                cursor="pointer"
                            >{ blog?.user.userName }</Text>
                        </Box>

                        <Box display="flex" gap={3}>
                            <Text fontSize="sm" color="gray"> { moment(blog?.createdAt).fromNow() }</Text>
                            <Text fontSize="sm" color="gray" fontWeight="500">·</Text>
                            <Text fontSize="sm" color="gray">{ blog?.readTime }</Text>
                        </Box>
                    </Box>
                </Box>
                { blog?.content && 
                    <Box dangerouslySetInnerHTML={{ __html: blog.content}} ></Box> 
                }

            </Box>
        </>
    )
}

export default BlogPage;