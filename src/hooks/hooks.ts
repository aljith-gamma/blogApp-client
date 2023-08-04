
import { fetchBlogs } from "@/apis/blog";
import { IBlogData } from "@/components/Blogs/Blog";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface IFetchResponse {
    blogs: IBlogData[]
    skip: number;
}

const PAGE_SIZE = 10;

const useBlogs = (keyName: string, url: string, flag: boolean) => {
    
    return useInfiniteQuery({
        queryKey: ["allBlogs", url, flag],
        queryFn: async ({ pageParam = 1}) => {
            const skip = (pageParam - 1) * PAGE_SIZE;
            const blogs: IFetchResponse= await fetchBlogs(`${url}skip=${skip}`);
            return blogs.blogs;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 0 ? undefined : allPages.length + 1;
        }
  });
}

export default useBlogs;