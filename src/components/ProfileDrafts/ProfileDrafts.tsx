import { Box, Spinner } from "@chakra-ui/react"
import { IBlogData } from "../Blogs/Blog";
import { fetchBlogs } from "@/apis/blog";
import { useQuery } from "@tanstack/react-query";

export const ProfileDrafts = () => {

    const  {isLoading, error, data} = useQuery<IBlogData[]>({
        queryKey: ['profileDrafts'],
        queryFn: async () => {
            const _id = Number(localStorage.getItem('_id'));
            if(!_id){
                return [] as IBlogData[];
            }
            const drafts: any = await fetchBlogs(`/blog/get?userId=${_id}&status=drafts`);
            return drafts as IBlogData[];
        }
    })

    if(isLoading) return <Spinner />
    return (
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minH="60vh">
            { data && data[0] ? <h1>Drafts</h1> : <h1>No Drafts!</h1>}
        </Box>
    )
}