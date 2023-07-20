"use client"

import { Blog } from "@/components/Blogs/Blog";
import { CreateBlog } from "@/components/CreateBlog/CreateBlog";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
    <Toaster />
      <Navbar onOpen={ onOpen } flag={true}/>
      <Container bgColor="primary" maxW="full" px={10} py={7}>
        <Blog />
        { isOpen && <CreateBlog isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } /> }
      </Container>
    </Box>
  )
}
