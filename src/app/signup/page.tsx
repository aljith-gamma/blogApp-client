"use client"
import { api } from "@/api/axios";
import { Avatar, Box, Button, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, FormEventHandler, use, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface UserData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const router = useRouter();

    const handleShowClick1 = () => setShowPassword1(!showPassword1);
    const handleShowClick2 = () => setShowPassword2(!showPassword2);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name === 'userName'){
            setUserData({
                ...userData,
                [name]: value.toLowerCase()
            })
        }else{
            setUserData({
                ...userData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userData.password === userData.confirmPassword){
            try {
                const response = await api({
                    url: '/auth/signup',
                    method: 'POST',
                    data: {...userData}
                })
                console.log(response);
                if(response?.status){
                    router.push('/');
                }
            } catch (err: any) {
                console.log(err?.message);
            }
        }else {
            toast.error('Password not match!')
        }
    }

    return (
        <>
            <Toaster />
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                bgColor="primary"
                justifyContent="center"
                alignItems="center"
            >

                {/* <Avatar />  */}
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="secondary"
                    py={6}
                    px={[6, 8]}
                    borderRadius="2xl"
                    boxShadow="xl"
                >
                    <Heading color="primary" mb={2}>Sign Up</Heading>
                    <Box minW={{ base: "100%", md: "468px" }}>
                        <form onSubmit={ handleSubmit }>
                            <Stack
                                spacing={5}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                            >

                                <Input type="text" focusBorderColor='primary' placeholder='Name' required 
                                    name="userName" onChange={ handleInputChange } value={userData.userName}
                                />
                                <Input type="email" focusBorderColor='primary' placeholder='Email' required 
                                    name="email" onChange={ handleInputChange } value={userData.email}
                                />
                                <InputGroup width="full">
                                    <Input
                                        focusBorderColor='primary'
                                        pr={['0rem','4.5rem']}
                                        type={showPassword1 ? 'text' : 'password'}
                                        placeholder='Password'
                                        required
                                        name="password"
                                        value={userData.password}
                                        onChange={ handleInputChange }
                                    />
                                    <InputRightElement width={['0 rem','4.5rem']}>
                                        <Button h='1.75rem' size='sm' onClick={handleShowClick1}>
                                            {showPassword1 ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <InputGroup >
                                    <Input
                                        pr={['0rem','4.5rem']}
                                        type={showPassword2 ? 'text' : 'password'}
                                        placeholder='Confirm password'
                                        focusBorderColor='primary'
                                        required
                                        name="confirmPassword"
                                        value={userData.confirmPassword}
                                        onChange={ handleInputChange }
                                    />
                                    <InputRightElement  width={['0 rem','4.5rem']}>
                                        <Button h='1.75rem' size='sm' onClick={handleShowClick2}>
                                            {showPassword2 ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <Button
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box >
                    Already have an account?{" "}
                    <Link href="/signin">
                        Sign in
                    </Link>
                </Box>
            </Flex>
        </>
    )
}

export default Signup;