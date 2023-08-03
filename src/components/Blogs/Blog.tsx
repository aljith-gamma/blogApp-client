import { Box, Spinner, Text } from "@chakra-ui/react"
import { SingleBlog } from "./SingleBlog"
import InfiniteScroll from "react-infinite-scroll-component";
import useBlogs from "@/hooks/hooks";

export interface IBlogData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    readTime: string;
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

const END_MESSAGE= <Text textAlign="center" py={3}>No more blogs!</Text>

const LOADING = <Box display="flex" justifyContent="center" py={3}><Spinner /></Box>

export const Blog = () => {

    const { data, fetchNextPage, hasNextPage } = useBlogs();

    return (
        <Box display="flex" gap={6} flexDir="column" w={["100%","90%","90%", "70%"]}
            mx="auto"
        >
            <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage || false}
                loader={ LOADING }
                dataLength={
                data?.pages?.reduce((total, page) => total + page.length, 0) || 0
                }
                endMessage={ END_MESSAGE }
            >
                {data?.pages.map((page) => {
                    return page.map((blog) => {
                        return (
                            <SingleBlog key={ blog.id } { ...blog } />
                        )
                    })
                })}

            </InfiniteScroll>
        </Box>
    )
}
