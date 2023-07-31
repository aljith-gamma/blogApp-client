import { Avatar, Box, Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { BsFillPeopleFill } from "react-icons/bs"
import { ProfileBlogs } from "../ProfileBlogs/ProfileBlogs"
import { ProfileDrafts } from "../ProfileDrafts/ProfileDrafts"
import { IProfileData } from "@/app/profile/[id]/page"

interface UserProfile extends IProfileData {
    onOpen: () => void | undefined;
    id: number;
}

export const UserProfile = ({ 
    avatarUrl, firstName, lastName, userName, onOpen, bio, followersCount, id
} : Partial<UserProfile>) => {
    return (
        <Box w={["90%", "80%", "80%", "80%"]} mx="auto" py={8}>
                <Box display="grid" gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 3fr"]} gap={4}
                    justifyContent="center"
                >
                    <Box display="flex" flexDir="column" >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Avatar size="2xl" name={ userName } src={ avatarUrl } />
                        </Box>
                        <Box mt={3}>
                            <Box display="flex" gap={2} justifyContent="center">
                                <Text fontSize="2xl" fontWeight="500" >{ firstName }</Text>
                                <Text fontSize="2xl" fontWeight="500" >{ lastName }</Text>
                            </Box>
                            <Box>
                                <Text color="gray.500" textAlign="center" fontWeight="500">@{ userName }</Text>
                            </Box>
                        </Box>

                        { onOpen ? (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <Button colorScheme="blackAlpha" 
                                    minW="250px" onClick={ onOpen }
                                >
                                    Edit profile
                                </Button>
                            </Box> 
                        ): (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <Button colorScheme="blackAlpha" 
                                    minW="250px"
                                >
                                    Follow
                                </Button>
                            </Box>) 
                        }

                        <Box mt={5}>
                            <Text w="80%" mx="auto" >
                                { bio?.slice(0, 160)} 
                            </Text>
                        </Box>

                        <Box mt={5} display="flex" alignItems="center" w="80%" mx="auto" gap="6px"
                            justifyContent="center"
                        >
                            <Icon as={ BsFillPeopleFill } boxSize={5} color="gray.500" />
                            <Text fontWeight="500">{ followersCount }</Text>
                            <Text fontSize="sm" fontWeight="500" color="gray.500" >Followers</Text>
                        </Box>

                    </Box>

                    <Box border="1px solid rgba(0, 0, 0, 0.3)" borderRadius="lg" p={[2, 6]} minH="60vh">
                        <Tabs>
                            <TabList>
                                <Tab>Blogs</Tab>
                                <Tab>Drafts</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <ProfileBlogs userId={ id } />
                                </TabPanel>
                                <TabPanel>
                                    <ProfileDrafts />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>

                </Box>
            </Box>
    )
}