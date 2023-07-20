"use client"
import { api } from "@/api/axios";
import { Navbar } from "@/components/Navbar/Navbar";
import { Avatar, Box, Container, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { IBlogData } from '@/components/Blogs/Blog'
import moment from "moment";

const BlogPage = ({ params }: any) => {
    const { blogId } = params;
    const [blog, setBlog] = useState<IBlogData | null>(null);

    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {
        try {
            const response: any = await api({
                url: `/blog/getblog/${blogId}`,
                method: 'GET'
            })
            setBlog(response?.blog);
            console.log(response.blog);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box bgColor="primary" minH="100vh">
            <Navbar flag={ false } />
            <Box w={["90%", "70%", "70%", "50%"]} mx="auto" py={4} display="flex" flexDir="column" gap={6}>

                <Box display="flex" alignItems="center" gap={4}>
                    <Box>
                        <Avatar size="md" name={blog?.user.userName} />
                    </Box>
                    <Box>
                        <Text fontSize="18px" >{ blog?.user.userName }</Text>
                        <Text> { moment(blog?.createdAt).fromNow() }</Text>
                    </Box>
                </Box>

                <Heading size='xl' color="secondary">{ blog?.title }</Heading>

                <Box w="full" h={["250px","300px","400px","500px"]} borderRadius="md" overflow="hidden">
                    <img src={ blog?.imageUrl } 
                        style={{ width: '100%', height: "100%", objectFit: 'cover'}}
                    />
                </Box>

                <Text fontSize="lg" color="secondary">{ blog?.description }</Text>
            </Box>
        </Box>
    )
}

export default BlogPage;