"use client"
import { AddIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import Link from "next/link";
import { Settings } from "./Settings";

interface INavbar {
    onOpen?: () => void;
    flag: boolean;
}

export const Navbar = ({ onOpen, flag }: INavbar) => {

    return (
        <Box  px={10} py={4} boxShadow="shadow" borderBottom="1px solid rgba(0, 0, 0, 0.1)"
            display="flex" justifyContent="space-between" zIndex={10} 
        >
            <Box cursor="pointer">
                <Text fontSize="2xl" color="secondary" fontWeight="600">
                    <Link href="/blog">Blog App</Link>
                </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={3}>
                { flag && <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color="primary" />
                        </InputLeftElement>
                    <Input type='tel' placeholder='Search' focusBorderColor='secondary' 
                        _placeholder={{ opacity: 1, color: 'black.300' }}  borderRadius="10px"
                        border="1px solid rgba(0, 0, 0, 0.5)" 
                    />
                </InputGroup> }

                { flag && <Box bgColor="blue.500" w="45px" height="33px" borderRadius="50%"
                    display="flex" justifyContent="center" alignItems="center"
                    cursor="pointer" boxShadow="xl" onClick={ onOpen }
                >
                    <AddIcon color="primary" fontSize="15px" />
                </Box> }
                <Settings />
            </Box> 
        </Box>
    )
}