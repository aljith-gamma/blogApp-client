import { Box, Grid } from "@chakra-ui/react"
import { SingleBlog } from "./SingleBlog"
import { api } from "@/apis/axios"
import { useEffect, useState } from "react"
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
    
    return (
        <Grid display="grid" gap={6}
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(3, 1fr)']} 
        >
            
            {data?.map((blog) => {
                return (
                    <SingleBlog key={ blog.id } { ...blog } />
                )
            })}
        </Grid>
    )
}