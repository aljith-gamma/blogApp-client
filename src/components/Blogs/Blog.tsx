import { Box } from "@chakra-ui/react"
import { SingleBlog } from "./SingleBlog"
import { fetchBlogs } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export interface IBlogData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    category: {
        category: string;
        id: number;
    },
    user: {
        id: number;
        userName: string;
        profile: {
            avatarUrl: string | null;
        } | null
    },
    tags: string[]
}

export const Blog = () => {

    const { isLoading, error, data} = useQuery({
        queryKey: ['allBlogs'],
        queryFn: async () => {
            const blogs = await fetchBlogs('/blog/all');
            return blogs;
        }
    })

    if(isLoading) return <Loader />
    if(error) return <h1>Error...</h1>
    console.log(data);
    return (
        <Box display="flex" gap={6} flexDir="column" w={["95%","90%","90%", "70%"]}
            mx="auto"
        >
            
            {data?.map((blog) => {
                return (
                    <SingleBlog key={ blog.id } { ...blog } />
                )
            })}
        </Box>
    )
}