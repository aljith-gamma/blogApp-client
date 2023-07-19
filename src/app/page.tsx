"use client"

import { Blog } from "@/components/Blogs/Blog";
import { CreateBlog } from "@/components/CreateBlog/CreateBlog";
import { Navbar } from "@/components/Navbar/Navbar";
import { Avatar, Box, Container, Heading, Text, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Navbar onOpen={ onOpen }/>
      <Container bgColor="primary" maxW="full" px={10} py={7}>
        <Blog />
        <CreateBlog isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } />
      </Container>
    </Box>
  )
}
