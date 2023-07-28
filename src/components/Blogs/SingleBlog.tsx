import { Avatar, Box, Heading, Text } from "@chakra-ui/react"
import { IBlogData } from "./Blog"
import { useRouter } from "next/navigation";
import moment from "moment";

export const SingleBlog = (props: IBlogData) => {
    const { title, description, user, imageUrl, id, createdAt } = props;
    const avatarUrl = user?.profile?.avatarUrl;
    const {userName} = user;

    const router = useRouter();

    const redirect = () => {
      router.push(`blog/${id}`)
    }

    return (
        <Box display="flex" flexDir="column" gap={4} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          p={5} borderRadius="xl" bgColor="secondary" cursor="pointer" onClick={ redirect }
        >
          <Box w="full" height={["200px", "200px", "200px", "300px"]}>
            <img src={ imageUrl }
                style={{ width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar size="xs" name={userName} src={ avatarUrl ? avatarUrl : undefined } />
            <Text fontSize="sm" fontWeight="500">{ userName }</Text>
            <Text fontSize="sm"> { moment(createdAt).fromNow() }</Text>
          </Box>

          <Box>
            <Heading fontSize="h2">{ title.length >= 45 ? title.slice(0, 45) + "..": title.slice(0, 45) }</Heading>
            <Text fontSize="medium" fontWeight="500" color="text" mt={2}
            >{ description.length >= 80 ? description.slice(0, 80) + ".." : description.slice(0, 80) }.</Text>
          </Box>
        </Box>
    )
}