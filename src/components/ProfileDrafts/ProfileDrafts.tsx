import { Box, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { IBlogData } from "../Blogs/Blog";
import { fetchBlogs } from "@/apis/blog";

export const ProfileDrafts = () => {
    const [blogs, setblogs] = useState<IBlogData[]>([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetchDraftBlogs();
    }, [])

    const fetchDraftBlogs = async () => {
        try {
            const drafts: any = await fetchBlogs('/blog/all?get=mine&status=drafts');
            setLoad(false);
            setblogs(drafts);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minH="60vh">
            { blogs[0] ? <h1>Drafts</h1> : load ? <Spinner /> : <h1>No Drafts!</h1>}
        </Box>
    )
}