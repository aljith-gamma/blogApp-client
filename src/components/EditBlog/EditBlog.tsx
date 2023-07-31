import { useEffect, useState } from "react";
import { BlogModal, ICategory } from "../CreateBlog/BlogModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, updateBlog } from "@/apis/blog";
import { toast } from "react-hot-toast";
import { IBlogData } from "../CreateBlog/CreateBlog";

interface IEditBlog {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    tags: string[];
    categoryId: string;
    imageUrl: string;
    blogId: number;
}

export const EditBlog = ({ isOpen, onClose, title, description, tags, categoryId, imageUrl, blogId }: IEditBlog) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    
    useEffect(() => {
        getCategories();
    }, [])
    
    const queryClient = useQueryClient();
    const mutation = useMutation(async (formData: FormData) => {
        const response = await updateBlog(formData, blogId);
        onClose();
    },{
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: ['profileBlogs']
            });
        }
    })

    
    const getCategories = async () => {
        const res: ICategory[] = await fetchCategories();
        setCategories(res);
    }

    const submitFormHandler = async (file: File | null, blogData:IBlogData, tags: string[]) => {
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('description', blogData.description);
        formData.append('categoryId', blogData.categoryId);
        formData.append('tags', JSON.stringify(tags));
        if(file) formData.append('file', file);

        mutation.mutate(formData);
    }

    return (
        <>
          <BlogModal categories={categories} submitFormHandler={submitFormHandler} isOpen={isOpen} onClose={onClose} 
            blogData={{ title, description, categoryId }} tagsData={ tags } imageUrl={imageUrl} heading="Update blog" btnName="Update"
          />
        </>
    )
}