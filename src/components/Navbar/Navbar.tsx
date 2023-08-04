"use client"
import { AddIcon, Search2Icon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import Link from "next/link";
import { Settings } from "./Settings";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface INavbar {
    flag: boolean;
    handleChange?: (text: string) => void;
    search?: string;
}

export const Navbar = ({ flag, handleChange, search }: INavbar) => {
    const router = useRouter();

    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        handleChange && handleChange(text);
    }

    return (
        <Box px={[5, 10]} py={4} boxShadow="shadow" borderBottom="1px solid rgba(0, 0, 0, 0.1)"
            display="flex" justifyContent="space-between" zIndex={10} 
        >
            <Box cursor="pointer">
                <Text fontSize="2xl" color="secondary" fontWeight="600">
                    <Link href="/blog">CubexO</Link>
                </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={3} >
                { flag && (
                    <InputGroup display={["none", "block"]}>
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon color="primary" />
                        </InputLeftElement>
                        <Input type='tel' placeholder='Search' focusBorderColor='secondary' 
                            _placeholder={{ opacity: 1, color: 'black.300' }}  borderRadius="10px"
                            border="1px solid rgba(0, 0, 0, 0.5)" value={search || ''} onChange={ changeHandler }
                        />
                    </InputGroup>
                )}

                { flag && <Box bgColor="blue.500" w={["33px","45px"]} height="33px" borderRadius="50%"
                    display="flex" justifyContent="center" alignItems="center"
                    cursor="pointer"  onClick={ () => router.push('/edit') }
                >
                    <AddIcon color="primary" fontSize="15px" />
                </Box> }
                <Settings />
            </Box> 
        </Box>
    )
}