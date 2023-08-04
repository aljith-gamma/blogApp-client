"use client"

import { Blog } from "@/components/Blogs/Blog";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [search, setSearch] = useState('');  
  const [debouncedText] = useDebounce(search, 1000);


  const handleChange = async (value: string) => {
      setSearch(value);
  }
  return (
    <Box bgColor="F9F9F9">
      <Toaster />
      <Navbar flag={true} handleChange={handleChange} search={search}/>
      <Container bgColor="primary" maxW="full" px={10} py={7} minH="100vh">
        <Blog search={ debouncedText } />
      </Container>
    </Box>
  )
}
