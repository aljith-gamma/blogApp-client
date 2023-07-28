"use client"
import { AddIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import Link from "next/link";
import { Settings } from "./Settings";
import { useState } from "react";

interface INavbar {
    onOpen?: () => void;
    flag: boolean;
}

export const Navbar = ({ onOpen, flag }: INavbar) => {

    return (
        <Box bgColor="secondary" px={10} py={4} boxShadow="xl"
            display="flex" justifyContent="space-between"
        >
            <Box cursor="pointer">
                <Text fontSize="2xl" color="primary" fontWeight="600">
                    <Link href="/blog">Blog App</Link>
                </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={3}>
                { flag && <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color="primary" />
                        </InputLeftElement>
                    <Input type='tel' placeholder='Search' focusBorderColor='primary' 
                        _placeholder={{ opacity: 1, color: 'black.300' }}  borderRadius="10px"
                        border="1px solid #7973C9" 
                    />
                </InputGroup> }

                { flag && <Box bgColor="primary" w="45px" height="33px" borderRadius="50%"
                    display="flex" justifyContent="center" alignItems="center"
                    cursor="pointer" boxShadow="xl" onClick={ onOpen }
                >
                    <AddIcon color="secondary" fontSize="15px" />
                </Box> }
                <Settings />
            </Box> 
        </Box>
    )
}