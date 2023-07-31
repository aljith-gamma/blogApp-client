import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { SingleTag } from "./SingleTag";
import { createBlog, fetchCategories } from "@/apis/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogModal } from "./BlogModal";

interface ICreateBlog {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

interface ICategory {
    id: number;
    category: string | number;
}

export interface IBlogData {
    title: string;
    description: string;
    categoryId: string;
}

const blogData = {
    title: '',
    description: '',
    categoryId: ''
}

export const CreateBlog = ({ isOpen, onOpen, onClose}: ICreateBlog) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    
    useEffect(() => {
        getCategories();
    }, [])
    
    const queryClient = useQueryClient();
    const mutation = useMutation(async (formData: FormData) => {
        const response = await createBlog(formData);
        onClose();
    },{
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: ['allBlogs']
            });
        }
    })

    
    const getCategories = async () => {
        const res: ICategory[] = await fetchCategories();
        setCategories(res);
    }

    // const imageFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setFile(e?.currentTarget?.files && e.currentTarget.files[0]);
    // }

    // const tagsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     if(!value.includes(' ')) setTagText(value.toLowerCase());
    // }

    // const addTags = () => {
    //     if(tags.length < 5){
    //         setTags([
    //             ...tags,
    //             tagText
    //         ])
    //     }else {
    //         toast.error("Tag limit exceeded")
    //     }
    //     setTagText(''); 
    // }

    // const removeTagHandler = (index: number) => {
    //     const tagData = tags.filter((item, ind) => index !== ind);
    //     setTags(tagData);
    // }

    // const blogDataHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setBlogData({
    //         ...blogData,
    //         [name]: value
    //     })
    // }

    const submitFormHandler = async (file: File | null, blogData:IBlogData, tags: string[]) => {
        if(!file){
            toast.error('Image field is mandatory!');
            return;
        }
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('description', blogData.description);
        formData.append('categoryId', blogData.categoryId);
        formData.append('tags', JSON.stringify(tags));
        formData.append('file', file);

        mutation.mutate(formData);
    }
  
    return (
      <>
        <BlogModal categories={categories} submitFormHandler={submitFormHandler} isOpen={isOpen} onClose={onClose} blogData={blogData} 
            heading="Create blog" btnName="Publish"
        />
      </>
    )
  }