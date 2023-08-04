import { Box, Spinner, Text } from "@chakra-ui/react"
import { Blog } from "./Blog";
import useBlogs from "@/hooks/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";


const END_MESSAGE= <Text textAlign="center" pt={5}>No more blogs!</Text>

const LOADING = <Box display="flex" justifyContent="center" py={3}><Spinner /></Box>

export const ProfileBlogs = ({ userId }: { userId: number | undefined}) => {
    const [flag, setFlag] = useState(false);
    const { data, fetchNextPage, hasNextPage } = useBlogs("profileBlogs", `/blog/get?userId=${userId}&status=published&`, flag);
    
    const handleFlag = () => {
        setFlag(!flag);
    }
    return (
        <Box display="flex" flexDir="column"  alignItems="center" minH="60vh">
            
            <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage || false}
                loader={ LOADING }
                dataLength={
                data?.pages?.reduce((total, page) => total + page.length, 0) || 0 }
                endMessage={ END_MESSAGE }
            >
                {
                    data?.pages.map((page) => {
                        return page.map((blog) => {
                            return (
                                <Blog key={blog.id} { ...blog } handleFlag={handleFlag}  />
                            )
                        })
                    })
                }
            </InfiniteScroll>
        </Box>
    )
}