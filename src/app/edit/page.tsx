"use client"

import { BlogEditor } from "@/components/BlogEditor/BlogEditor";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box } from "@chakra-ui/react";

export default function EditBlog(){
    return(
        <>
        <Navbar flag={false} />
        <Box w="90%" mx="auto" my={6}> 
            <BlogEditor code="<h1>Write your blog here...</h1>" btnName="Create" categoryId="" title="" 
                description="" tagsData={[]} flag='CREATE'
            />
        </Box>
        </>
    )
} 