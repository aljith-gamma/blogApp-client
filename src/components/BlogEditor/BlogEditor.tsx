import { v4 as uuid } from 'uuid';
import { Box, Button} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Tags } from './Tags';
import { Categories } from './Categories';
import { Toaster, toast } from 'react-hot-toast';
import { createBlog, uploadImages } from '@/apis/blog';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
import * as cheerio from 'cheerio';

interface IBlogEditor {
    code: string;
    btnName: string;
    categoryId: number | string;
}

interface IImageData {
    id: string;
    imgUrl: string;
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

export const BlogEditor = ( { code, btnName, categoryId }: IBlogEditor) => { 

    const [tags, setTags] = useState<string[]>([]);
    const [id, setId] = useState('' || categoryId);
    const [load, setLoad] = useState(false);

    const [codeData, setcodeData] = useState(code);
    const router = useRouter();
    
    const handleProcedureContentChange = (content: any, delta: any, source: any, editor: any) => {
        setcodeData(content);
    };

    const sumitHandler = async () => {
        if(!id){
            toast.error('Category should be selected!');
            return;
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(codeData, 'text/html');

        const imgTags = doc.querySelectorAll('img');

        if(!imgTags[0]){
            toast.error('Atleast 1 image should be there!');
            return;
        }

        const blobsData = Array.from(imgTags).map((img) => {
            const id = uuid();
            const base64String = img.src;
            img.id = id;
            
            const mime = getMimeTypeFromBase64(base64String);
            const blob = base64ToBlob(base64String, mime);
            return {
                blob,
                id
            };
        })

        setLoad(true);
        const formData = new FormData();
        blobsData.map((blobItem) => {
            formData.append('files', blobItem.blob, blobItem.id );
        })

        let imageUrl = "";
        const response: any = await uploadImages(formData);
        response.forEach((item: IImageData) => {
            const imgTag: any = doc.getElementById(item.id);
            if( imgTag ) imgTag.src = item.imgUrl;
            if(!imageUrl) imageUrl = item.imgUrl;
        })

        const newCodeData = doc.querySelector('body')?.innerHTML;
        if(newCodeData) {
            const $ = cheerio.load(newCodeData);

            const h1Elements = $('h1');
            let heading = "";
            h1Elements.each((index, element) => {
                const text = $(element).text();
                heading = text;
                if(text) return false;
            })

            const pElements = $('p');
            let description = "";
            pElements.each((index, element) => {
                const text = $(element).text();
                if( text.length >= 140) description = text.slice(0, 280);
                if( description ) return false;
            })

            if(!heading){
                toast.error('Atleast 1 heading should be there!');
                setLoad(false);
                return;
            }
            if(!description ){
                toast.error('Description should be there!');
                setLoad(false);
                return;
            }

            const form = new FormData();
            form.append('content', newCodeData);
            form.append('tags', JSON.stringify(tags));
            form.append('categoryId', String(id));
            form.append('title', heading.slice(0, 150));
            form.append('description', description);
            form.append('imageUrl', imageUrl);

            const result = await createBlog(form);
            if(result?.status){
                router.push('/blog');
            }
            console.log(result);
        }

        setLoad(false);
    }

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

    const handleChange = (value: number) => {
        setId(value);
    }

    return (
        <>
            <Toaster />
            { load && <Loader /> }
            <Box display="grid" gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} gap={5}>
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
            <Button onClick={sumitHandler} colorScheme="green" >Create</Button>
        </>
    );
}