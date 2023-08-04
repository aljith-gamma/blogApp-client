
import { api } from "./axios";
import { IFetchResponse } from "@/hooks/hooks";

export const fetchBlogs = async (url: string): Promise<IFetchResponse> => {
    try {
        const response: any = await api({
            url,
            method: 'GET'
        })
        // console.log(response.blogs);
        return response.blogs || [];
    } catch (err) {
        console.log({err});
        return {
            blogs: [],
            skip: 0
        };
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

export const fetchSingleBlog = async (blogId: number, check?: boolean) => {
    try {
        const url = check ? `/blog/getblog/${blogId}?check=1` : `/blog/getblog/${blogId}`;
        const response: any = await api({
            url: url,
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