import { Avatar, Box, Heading, Text } from "@chakra-ui/react"


export const SingleBlog = () => {
    return (
        <Box display="flex" flexDir="column" gap={4} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          p={5} borderRadius="xl" bgColor="secondary" cursor="pointer"
        >
          <Box w="full" height={["200px", "250px","300px"]}>
            <img src="https://miro.medium.com/v2/resize:fit:572/1*blzCZPkET6tciaI_JCC95A.jpeg" 
                style={{ width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar size="xs" />
            <Text fontSize="sm" fontWeight="500">Aljith KJ</Text>
          </Box>

          <Box>
            <Heading fontSize="h2">Five Python Decorators That Can Reduce Your Code By Half</Heading>
            <Text fontSize="medium" fontWeight="500" color="text" mt={2}
            >Upgrade your Python game by using these wrappers for maximum efficiency and readability.</Text>
          </Box>
        </Box>
    )
}