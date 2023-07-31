import { updateProfileData } from "@/apis/profile";
import { IProfileData } from "@/app/profile/[id]/page";
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

interface IEditProfile {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
} 

type IEditProfileType = IEditProfile & Partial<IProfileData>;

export const EditProfile = ({ isOpen, onOpen, onClose, firstName, lastName, userName, bio, avatarUrl }: IEditProfileType) => {
    const [profileData, setProfileData] = useState({
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        userName: userName ? userName : '',
        bio: bio ? bio : ''
    })
    const [avatar, setAvatar] = useState<File | null>(null);

    const initialRef = useRef(null);
    const queryClient = useQueryClient();
    const mutation = useMutation(async (formData: FormData) => {
        const response = await updateProfileData(formData);
    }, {
        onSuccess: async() => {
            onClose();
            await queryClient.invalidateQueries({
                queryKey: ['profileData']
            })
        }
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'bio' && value.length > 160){
            toast.error('length limit exceeded');
            return;
        }
        setProfileData({
            ...profileData,
            [name]: value
        })
    }

    const imageFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatar(e?.currentTarget?.files && e.currentTarget.files[0]);
    }

    const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if(avatar) formData.append('avatar', avatar);
        formData.append('firstName', profileData.firstName);
        formData.append('lastName', profileData.lastName);
        formData.append('userName', profileData.userName);
        formData.append('bio', profileData.bio);
        
        mutation.mutate(formData);
    }

    if(mutation.isLoading) return <Loader />

    return (
        <>
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent maxW="700px" p={[0, 2, 6]} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                borderRadius="2xl" mx={5}
            >
                <form onSubmit={ updateProfile }>
                    <ModalHeader>Edit profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} display="flex" flexDir="column" gap={4}>
                        <Box display="grid" gridTemplateColumns={["1 fr", "1fr 1fr"]} gap={5}>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input ref={initialRef} placeholder='First name' focusBorderColor="primary" required
                                    name="firstName" onChange={ handleInputChange } value={profileData.firstName}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Last name</FormLabel>
                                <Input placeholder='Last name' focusBorderColor="primary" required
                                    name="lastName" onChange={ handleInputChange } value={profileData.lastName}
                                />
                            </FormControl>
                        </Box>

                        <FormControl>
                            <FormLabel>User name</FormLabel>
                            <Input placeholder='User name' focusBorderColor="primary" required
                                name="userName" onChange={ handleInputChange } value={profileData.userName}
                            />
                        </FormControl>

                        <FormControl >
                            <FormLabel>Profile image</FormLabel>
                            <Input placeholder='File' type="file" id="avatar" display="none" 
                                onChange={ imageFileHandler } 
                            />
                            <label htmlFor="avatar" style={{ cursor: 'pointer'}}>
                                <Box display="flex" alignItems="center" gap="10px">
                                    <img src="../upload-img.png" alt="add avatar"
                                        style={{ width: '30px'}}
                                    />
                                    <Text fontSize="14px">Add avatar</Text>
                                    { avatarUrl && !avatar ? (<Box w="50px" h="50px">
                                        <img src={avatarUrl} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    </Box>) : ( <Text>{ avatar?.name.substring(0, 15) }</Text> ) }
                                </Box>
                            </label>
                        </FormControl>

                        <FormControl >
                            <FormLabel>Bio</FormLabel>
                            <Textarea placeholder='Write you bio here...' focusBorderColor="primary" required
                                name="bio" value={profileData.bio} onChange={ handleInputChange }
                            />
                        </FormControl>
    

                    </ModalBody>
        
                    <ModalFooter display="flex" gap={2}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme='blue' mr={3} type="submit">
                            Update
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
      </>
    )
}