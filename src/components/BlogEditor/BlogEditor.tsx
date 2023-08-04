import { v4 as uuid } from 'uuid';
import { Box, Button, FormControl, FormLabel, Input, Textarea} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Tags } from './Tags';
import { Categories } from './Categories';
import { Toaster, toast } from 'react-hot-toast';
import { createBlog, updateBlog, uploadImages } from '@/apis/blog';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
import readingTime from 'reading-time';

interface IBlogEditor {
    code: string;
    btnName: string;
    categoryId: string;
    title: string;
    description: string;
    tagsData: string[];
    flag: 'UPDATE' | 'CREATE';
    blogId?: number;
}

interface IImageData {
    id: string;
    imgUrl: string;
}

interface IBlogData {
    title: string;
    description: string;
}

function base64ToBlob(base64String: any, mimeType: any) {

    const binaryString = atob(base64String.split(',')[1]);
    const byteCharacters = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        byteCharacters[i] = binaryString.charCodeAt(i);
    }
    return new Blob([byteCharacters], { type: mimeType });
}

function getMimeTypeFromBase64(base64String: any) {
    const matches = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
    if (matches) {
      return matches[1];
    }
    return null;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: [] }],
        [{ font: [] }],
        [{ align: ["right", "center", "justify"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ color: ["red", "#785412", "yellow"] }],
        [{ background: ["red", "#785412"] }]
    ]
}

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
];

export const BlogEditor = ( { code, btnName, categoryId, title, description, tagsData, blogId, flag }: IBlogEditor) => { 
    const [blogData, setBlogData] = useState<IBlogData>({
        title,
        description
    })
    const [tags, setTags] = useState<string[]>(tagsData);
    const [id, setId] = useState('' || categoryId);
    const [load, setLoad] = useState(false);

    const [codeData, setcodeData] = useState(code);
    const router = useRouter();
    
    const handleProcedureContentChange = (content: any, delta: any, source: any, editor: any) => {
        setcodeData(content);
    };

    const addTags = (tagText: string) => {
        if(tags.length < 5){
            setTags([
                ...tags,
                tagText
            ])
        }else {
            toast.error("Tag limit exceeded")
        }
    }

    const removeTagHandler = (index: number) => {
        const tagData = tags.filter((item, ind) => index !== ind);
        setTags(tagData);
    }

    const handleChange = (value: string) => {
        setId(value);
    }

    const blogDataHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'title' && value.length >= 150) {
            toast.error('Title size exceeded!');
            return;            
        }
        if(name === 'description' && value.length >= 350) {
            toast.error('Description size exceeded!');
            return;            
        }
        setBlogData({
            ...blogData,
            [name]: value
        })
    }

    const sumitHandler = async () => {
        if(!id){
            toast.error('Category should be selected!');
            return;
        }

        if(!blogData.title){
            toast.error('Blog title cannot be empty!');
            return;
        }

        if(!blogData.description){
            toast.error('Blog description cannot be empty!');
            return;
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(codeData, 'text/html');

        const imgTags = doc.querySelectorAll('img');

        if(!imgTags[0]){
            toast.error('Atleast 1 image should be there!');
            return;
        }

        function isDataURL(url: string) {
            return /^data:/.test(url);
        }

        let imageUrl = "";
        let blobsData: any = [];
        Array.from(imgTags).forEach((img) => {
            const base64String = img.src;
            
            if(isDataURL(base64String)){
                const id = uuid();
                img.id = id;
                const mime = getMimeTypeFromBase64(base64String);
                const blob = base64ToBlob(base64String, mime);
                blobsData.push({
                    blob,
                    id
                });
            }else {
                if(!imageUrl) imageUrl = base64String;
            }
            
        })

        setLoad(true);
        
        if(blobsData.length){
            const formData = new FormData();
            blobsData.map((blobItem: any) => {
                formData.append('files', blobItem.blob, blobItem.id );
            })
    
            const response: any = await uploadImages(formData);
            if(!response) {
                setLoad(false);
                toast.error('No response from the server!');
                return;
            }

            response.forEach((item: IImageData) => {
                const imgTag: any = doc.getElementById(item.id);
                if( imgTag ) imgTag.src = item.imgUrl;
                if(!imageUrl) imageUrl = item.imgUrl;
            })
        }

        const newCodeData = doc.querySelector('body')?.innerHTML;
        if(newCodeData) {
            const readTime = readingTime(newCodeData)
            const form = new FormData();
            form.append('content', newCodeData);
            form.append('tags', JSON.stringify(tags));
            form.append('categoryId', String(id));
            form.append('title', blogData.title);
            form.append('description', blogData.description);
            form.append('imageUrl', imageUrl);
            form.append('readTime', readTime.text);

            let result;
            if(flag === 'CREATE'){
                result = await createBlog(form);
            }else if(flag === 'UPDATE' && blogId){
                result = await updateBlog(form, blogId);
            }

            if(result?.status){
                router.push('/blog');
            }
        }
        setLoad(false);
    }

    return (
        <>
            <Toaster />
            { load && <Loader /> }

            <Box>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder='Title' required
                        name="title" value={blogData.title} onChange={ blogDataHandler }
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder='Write you description here...' required
                        name="description" value={blogData.description} onChange={ blogDataHandler }
                    />
                </FormControl>
            </Box>

            <Box display="grid" gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} gap={5} my={4}>
                <Box>
                    <Tags tagsData={tags} addTags={ addTags } removeTagHandler={removeTagHandler} />
                </Box>
                <Box>
                    <Categories categoryId={ id } handleChange={ handleChange } />
                </Box>
            </Box>

            <Box my={6}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={codeData}
                    onChange={handleProcedureContentChange}
                />
            </Box>
            <Button onClick={sumitHandler} colorScheme="green" >{ btnName }</Button>
        </>
    );
}