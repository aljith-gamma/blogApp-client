"use client"
import { signinUser } from "@/apis/auth";
import { api } from "@/apis/axios";
import Loader from "@/components/Loader/Loader";
import { Avatar, Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export interface UserSigninData {
    email: string;
    password: string
}

const Signin = () => {
    const [userData, setUserData] = useState<UserSigninData>({
        email: '',
        password: ''
    })

    const mutation = useMutation(async () => {
        const response = await signinUser(userData);
        if(response?.status){
            router.push('/blog');
        }
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const router = useRouter();
    if(localStorage.getItem('token')) router.back();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        mutation.mutate();
    }

    if(mutation.isLoading) return <Loader />

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
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="primary"
                    py={6}
                    px={[6, 8]}
                    borderRadius="2xl"
                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                >
                    <Heading color="primary" mb={2}>Sign In</Heading>
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form onSubmit={ handleSubmit }>
                            <Stack
                                spacing={5}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                            >

                                <Input type="email" focusBorderColor='primary' placeholder='Email' required 
                                    name="email" value={userData.email} onChange={ handleInputChange }
                                />

                                <InputGroup width="full">
                                    <Input
                                        focusBorderColor='primary'
                                        pr={['0rem','4.5rem']}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        required
                                        name="password"
                                        value={userData.password}
                                        onChange={ handleInputChange }
                                    />
                                    <InputRightElement width={['0 rem','4.5rem']}>
                                        <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    New to us?{" "}
                    <Link href="/signup" style={{ color: 'blue'}}>
                        Sign up
                    </Link>
                </Box>
            </Flex>
        </>
    )
}

export default Signin;
