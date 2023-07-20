import { Box, Grid } from "@chakra-ui/react"
import { SingleBlog } from "./SingleBlog"
import { api } from "@/api/axios"
import { useEffect, useState } from "react"

export interface IBlogData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    category: {
        category: string;
    },
    user: {
        id: number;
        userName: string;
        profile: {
            avatarUrl: string | null;
        } | null
    }
}

export const Blog = () => {

    const [blogs, setBlogs] = useState<IBlogData[]>([]);

    useEffect(() => {
        fetchBlogs();
    }, [])

    const fetchBlogs = async () => {
        try {
            const res: any = await api({
                url: '/blog/all',
                method: 'GET'
            })
            console.log(res.blogs);
            setBlogs(res?.blogs);
        } catch (err) {
            console.log(err);
        }
    } 
    return (
        <Grid display="grid" gap={6}
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(3, 1fr)']} 
        >
            {blogs[0] && (
                blogs.map((blog) => {
                    return (
                        <SingleBlog key={ blog.id } { ...blog } />
                    )
                })
            )}
        </Grid>
    )
}