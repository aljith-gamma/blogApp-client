"use client"
import { api } from "@/apis/axios";
import { fetchProfileData } from "@/apis/profile";
import { EditProfile } from "@/components/EditProfile/EditProfile";
import Loader from "@/components/Loader/Loader";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProfileBlogs } from "@/components/ProfileBlogs/ProfileBlogs";
import { ProfileDrafts } from "@/components/ProfileDrafts/ProfileDrafts";
import { Avatar, Box, Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillPeopleFill } from 'react-icons/bs';

const bio = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'

export interface IProfileData {
    firstName: string;
    lastName: string;
    userName: string;
    bio: string;
    avatarUrl: string;
    userId: string;
    user: number;
    followers: number;
}

const Profile = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // const [profileData, setProfileData] = useState<Partial<IProfileData>>({});

    // useEffect(() => {
    //     getProfileData();
    // }, [])

    // const getProfileData = async () => {
    //     const res: any = await fetchProfileData();
    //     setProfileData(res);
    // }

    const { isLoading, error, data } = useQuery<Partial<IProfileData>>({
        queryKey: ['profileData'],
        queryFn: async () => {
            const profileData  = await fetchProfileData();
            return profileData as Partial<IProfileData>;
        }
    })

    if(isLoading) return <Loader />
    if(error) return <h1>Error...</h1>
    return (
        <>  
            <Navbar flag={false} />
            <Toaster />
            { isOpen && <EditProfile  isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } {...data} /> }
            <Box w={["90%", "80%", "80%", "80%"]} mx="auto" py={8}>
                <Box display="grid" gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 3fr"]} gap={4}
                    justifyContent="center"
                >
                    <Box display="flex" flexDir="column" >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Avatar size="2xl" name={ data?.userName } src={ data?.avatarUrl } />
                        </Box>
                        <Box mt={3}>
                            <Box display="flex" gap={2} justifyContent="center">
                                <Text fontSize="2xl" fontWeight="500" >{ data?.firstName }</Text>
                                <Text fontSize="2xl" fontWeight="500" >{ data?.lastName }</Text>
                            </Box>
                            <Box>
                                <Text color="gray.500" textAlign="center" fontWeight="500">@{ data?.userName }</Text>
                            </Box>
                        </Box>

                        { data?.user !== data?.userId ? (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <Button colorScheme="blackAlpha" 
                                    minW="250px"
                                >
                                    Follow
                                </Button>
                            </Box>) : (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <Button colorScheme="blackAlpha" 
                                    minW="250px" onClick={ onOpen }
                                >
                                    Edit profile
                                </Button>
                            </Box> 
                        ) }

                        <Box mt={5}>
                            <Text w="80%" mx="auto" >
                                { data?.bio?.slice(0, 160)} 
                            </Text>
                        </Box>

                        <Box mt={5} display="flex" alignItems="center" w="80%" mx="auto" gap="6px"
                            justifyContent="center"
                        >
                            <Icon as={ BsFillPeopleFill } boxSize={5} color="gray.500" />
                            <Text fontWeight="500">{ data?.followers }</Text>
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
                                    <ProfileBlogs />
                                </TabPanel>
                                <TabPanel>
                                    <ProfileDrafts />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Profile;