import { IBlogData } from "@/components/Blogs/Blog";
import { api } from "./axios";

export const fetchBlogs = async (url: string): Promise<IBlogData[]> => {
    try {
        const response: any = await api({
            url,
            method: 'GET'
        })
        // console.log(response.blogs);
        return response.blogs || [];
    } catch (err) {
        console.log({err});
        return [];
    }
} 

export const uploadImages = async (formData: FormData) => {
    try {
        const response = await api({
            url: '/blog/upload',
            method: 'POST',
            data: formData
        });
        // console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const createBlog = async (formData: FormData) => {
    try {
        const response = await api({
            url: '/blog/create',
            method: 'POST',
            data: formData
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const updateBlog = async (formData: FormData, blogId: number) => {
    try {
        const response = await api({
            url: `/blog/${blogId}`,
            method: 'PATCH',
            data: formData
        });
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const fetchSingleBlog = async (blogId: number) => {
    try {
        const response: any = await api({
            url: `/blog/getblog/${blogId}`,
            method: 'GET'
        })
        // console.log(response.blog);
        return response.blog;
    } catch (err) {
        console.log({err});
    }
} 

export const fetchCategories = async () => {
    try {
        const response: any = await api({
            url: '/blog/categories',
            method: 'GET'
        })
        // console.log(response);
        return response.categories || [];
    } catch (err) {
        console.log(err);
    } 
}

export const deleteBlog = async (id: number) => {
    try {
        const response: any = await api({
            url: `/blog/delete/${id}`,
            method: 'DELETE'
        })
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    } 
}