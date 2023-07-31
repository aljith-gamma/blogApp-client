import { Box, Spinner, Text } from "@chakra-ui/react"
import { IBlogData } from "../Blogs/Blog";
import { Blog } from "./Blog";
import { fetchBlogs } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";

export const ProfileBlogs = ({ userId }: { userId: number | undefined}) => {

    const { isLoading, error, data } = useQuery<IBlogData[]>({
        queryKey: ['profileBlogs'],
        queryFn: async () => {
            if(!userId){
                return [] as IBlogData[];
            }
            const blogs: any = await fetchBlogs(`/blog/get?userId=${userId}&status=published`);
            return blogs as IBlogData[];
        }
    })

    if(error) return <h1>Error</h1>
    
    return (
        <Box display="flex" flexDir="column"  alignItems="center" minH="60vh">
            { isLoading && <Spinner /> }
            { !isLoading && data && !data[0] && (
                <Box minH="60vh" display="flex" alignItems="center"><Text>No Blogs</Text></Box>
            )}
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