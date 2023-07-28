import { Box, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { IBlogData } from "../Blogs/Blog";
import { Blog } from "./Blog";
import { fetchBlogs } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";


export const ProfileBlogs = () => {
    // const [blogs, setblogs] = useState<IBlogData[]>([]);
    const [load, setLoad] = useState(true);

    // useEffect(() => {
    //     getBlogs();
    // }, [])

    const { isLoading, error, data } = useQuery<IBlogData[]>({
        queryKey: ['profileBlogs'],
        queryFn: async () => {
            const blogs: any = await fetchBlogs('/blog/all?get=mine&status=published');
            setLoad(false);
            return blogs as IBlogData[];
        }
    })

    if(error) return <h1>Error</h1>

    return (
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minH="60vh">
            { isLoading && <Spinner /> }
            { !isLoading && data && !data[0] && <h1>No blogs</h1>}
            {
                data && data[0] && data.map((blog) => {
                    return (
                        <Blog key={blog.id} { ...blog } />
                    )
                })
            }
        </Box>
    )
}