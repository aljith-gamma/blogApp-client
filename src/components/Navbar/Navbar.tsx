"use client"
import { AddIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"


export const Navbar = () => {
    return (
        <Box bgColor="secondary" px={10} py={4} boxShadow="xl"
            display="flex" justifyContent="space-between"
        >
            <Box cursor="pointer">
                <Text fontSize="2xl" color="primary" fontWeight="600">Blog App</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color="primary" />
                        </InputLeftElement>
                    <Input type='tel' placeholder='Search' focusBorderColor='primary' 
                        _placeholder={{ opacity: 1, color: 'black.300' }}  borderRadius="10px"
                        border="1px solid #7973C9" 
                    />
                </InputGroup>

                <Box bgColor="primary" w="43px" height="35px" borderRadius="50%"
                    display="flex" justifyContent="center" alignItems="center"
                    cursor="pointer" boxShadow="xl"
                >
                    <AddIcon color="secondary" fontSize="15px" />
                </Box>
            </Box>
        </Box>
    )
}