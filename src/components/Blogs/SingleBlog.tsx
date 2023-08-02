import { Avatar, Box, Heading, Text } from "@chakra-ui/react"
import { IBlogData } from "./Blog"
import { useRouter } from "next/navigation";
import moment from "moment";

export const SingleBlog = (props: IBlogData) => {
    const { title, description, user, imageUrl, id, createdAt } = props;
    const avatarUrl = user?.profile?.avatarUrl;
    const { userName, id : userId } = user;

    const router = useRouter();

    const redirect = () => {
      router.push(`blog/${id}`)
    }

    return (
        <Box display="grid" gridTemplateColumns="3fr 1fr" transition=".2s ease-in-out" _hover={{ bgColor: 'gray.200'}}
          p={5} borderRadius="xl" bgColor="primary" cursor="pointer" onClick={ redirect } gap={3}
        >
          <Box display="flex" flexDir="column" gap={4}>
            <Box display="flex" alignItems="center" gap={2} ml={1}>
              <Avatar size="xs" name={userName} src={ avatarUrl ? avatarUrl : undefined } />
              <Text fontSize="sm" fontWeight="500" onClick={(e) => {
                e.stopPropagation();
                router.push(`/profile/${userId}`)
              }}>{ userName }</Text>
              <Text fontSize="sm" color="gray.600"> { moment(createdAt).fromNow() }</Text>
            </Box>

            <Box>
              <Heading fontSize="h2">{ title.length >= 70 ? title.slice(0, 70) + "..": title.slice(0, 70) }</Heading>
              <Text fontSize="medium" fontWeight="300" color="black" mt={2}
              >{ description.length >= 280 ? description.slice(0, 280) + ".." : description.slice(0, 280) }.</Text>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center">
            <Box w={["200px", "200px", "200px", "150px"]} height={["200px", "200px", "200px", "150px"]}>
              <img src={ imageUrl }
                  style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                  />
            </Box>
          </Box>
        </Box>
    )
}