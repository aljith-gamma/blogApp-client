import { Box, Icon, Text } from "@chakra-ui/react"
import { IBlogData } from "../Blogs/Blog"
import moment from "moment"
import { useRouter } from "next/navigation"
import { ProfileSettings } from "./ProfileSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/apis/blog";

export const Blog = ({ title, description, imageUrl, category, createdAt, id, user: { id : userId}, tags  } : IBlogData) => {

    const router = useRouter();
    const _id = localStorage.getItem('_id') && Number(localStorage.getItem('_id'));

    const queryClient = useQueryClient();

    const mutation = useMutation(async (id: number) => {
        const response = await deleteBlog(id);
    },{
        onSuccess: () => {
            queryClient.invalidateQueries(['profileBlogs']);
        }
    })

    const redirect = () => {
        router.push(`/blog/${id}`);
    }

    const removeBlog = () => {
        mutation.mutate(id);
    }
    return (
        <Box cursor="pointer" borderBottom="1px solid rgba(0, 0, 0, 0.2)" py={6}  transition=".3s ease" w="100%"
            display="flex" flexDir="column" gap={4} _hover={{ bgColor: 'gray.200'}} px={5} onClick={ redirect }
        >
            <Box display="grid" gridTemplateColumns={["1fr", "3.5fr 1fr"]} gap={4}
                justifyContent="space-between"
            >
                <Box order={[2, 1]}>
                    <Text fontSize="2xl" fontWeight="600">{ title.length >= 50 ? title.slice(0, 50) + "..." : title.slice(0, 50) }</Text>
                    <Text>{ description.length >= 200 ? description.slice(0, 200) + "..." : description.slice(0, 200) }</Text>
                </Box>

                <Box display="flex" gap={2} order={[1, 2]}>
                    <Box w={["100%", "130px"]} h={["150px", "130px"]} alignSelf="flex-end">
                        <img src={ imageUrl } style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                    </Box>
                    { userId === _id && <Box onClick={(e) => e.stopPropagation()} >
                        <ProfileSettings deleteBlog={ removeBlog }  blogId={id}/>
                    </Box> }
                </Box>
            </Box>

            <Box display="flex" gap={6} alignItems="center">
                <Text fontWeight="500" fontSize="sm">{ category.category }</Text>
                <Text fontSize="sm">{ moment(createdAt).fromNow()}</Text>
            </Box>
        </Box>
    )
}