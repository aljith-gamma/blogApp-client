"use client"
import { AddIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons"
import { Avatar, Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"

interface INavbar {
    onOpen: () => void;
}

export const Navbar = ({ onOpen }: INavbar) => {
    return (
        <Box bgColor="secondary" px={10} py={4} boxShadow="xl"
            display="flex" justifyContent="space-between"
        >
            <Box cursor="pointer">
                <Text fontSize="2xl" color="primary" fontWeight="600">Blog App</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={3}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color="primary" />
                        </InputLeftElement>
                    <Input type='tel' placeholder='Search' focusBorderColor='primary' 
                        _placeholder={{ opacity: 1, color: 'black.300' }}  borderRadius="10px"
                        border="1px solid #7973C9" 
                    />
                </InputGroup>

                <Box bgColor="primary" w="45px" height="33px" borderRadius="50%"
                    display="flex" justifyContent="center" alignItems="center"
                    cursor="pointer" boxShadow="xl" onClick={ onOpen }
                >
                    <AddIcon color="secondary" fontSize="15px" />
                </Box>
                <Box cursor="pointer">
                    <Avatar size='sm' bgColor="primary" />
                </Box>
            </Box>
        </Box>
    )
}