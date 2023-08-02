"use client"

import { BlogEditor } from "@/components/BlogEditor/BlogEditor";
import { Blog } from "@/components/Blogs/Blog";
import { CreateBlog } from "@/components/CreateBlog/CreateBlog";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box bgColor="F9F9F9">
      <Toaster />
      <Navbar onOpen={ onOpen } flag={true}/>
      <Container bgColor="primary" maxW="full" px={10} py={7} minH="100vh">
        <Blog />
        { isOpen && <CreateBlog isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } /> }
      </Container>
      {/* <BlogEditor code="<h1>Hello</h1>" /> */}
    </Box>
  )
}
