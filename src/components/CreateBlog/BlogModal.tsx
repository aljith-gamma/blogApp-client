import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea } from "@chakra-ui/react"
import { SingleTag } from "./SingleTag";
import { fetchCategories } from "@/apis/blog";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface IBlogModal {
    isOpen: boolean;
    onClose: () => void;
    submitFormHandler: (file: File | null, blogData: IBlogData, tags: string[]) => void;
    blogData: IBlogData;
    categories: ICategory[];
    tagsData?: string[];
    imageUrl?: string;
    heading: string;
    btnName: string;
}

export interface ICategory {
    id: number;
    category: string | number;
}

interface IBlogData {
    title: string;
    description: string;
    categoryId:  string;
}

export const BlogModal = ({isOpen, onClose, submitFormHandler, categories, blogData, tagsData, imageUrl, heading, btnName }: IBlogModal) => {

    const [file, setFile] = useState<File | null>(null);
    const [tagText, setTagText] = useState('');
    const [tags, setTags] = useState<string[]>(tagsData || []);
    const [ blogDataInput, setBlogDataInput ] = useState<IBlogData>({
        title: blogData.title,
        description: blogData.description,
        categoryId: blogData.categoryId
    })
    const initialRef = useRef(null);

    const blogDataHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlogDataInput({
            ...blogDataInput,
            [name]: value
        })
    }

    const imageFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e?.currentTarget?.files && e.currentTarget.files[0]);
    }

    const tagsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(!value.includes(' ')) setTagText(value.toLowerCase());
    }

    const addTags = () => {
        if(tags.length < 5){
            setTags([
                ...tags,
                tagText
            ])
        }else {
            toast.error("Tag limit exceeded")
        }
        setTagText(''); 
    }

    const removeTagHandler = (index: number) => {
        const tagData = tags.filter((item, ind) => index !== ind);
        setTags(tagData);
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitFormHandler(file, blogDataInput, tags)
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent maxW="700px" p={[0, 2, 6]} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    borderRadius="2xl" mx={5}
                >
                    <form onSubmit={ submit }>
                        <ModalHeader>{ heading }</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} display="flex" flexDir="column" gap={4}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input ref={initialRef} placeholder='Title' focusBorderColor="primary" required
                                    name="title" value={blogDataInput.title} onChange={ blogDataHandler }
                                />
                            </FormControl>

                            <FormControl display="grid" gridTemplateColumns="1.5fr 1fr">
                                <Box>
                                    <FormLabel>Image</FormLabel>
                                    <Input placeholder='File' type="file" id="file" display="none" 
                                        onChange={ imageFileHandler } 
                                    />
                                    <label htmlFor="file" style={{ cursor: 'pointer'}}>
                                        <Box display="flex" alignItems="center" gap="10px">
                                            <img src="../upload-img.png" alt="add image"
                                                style={{ width: '30px'}}
                                            />
                                            <Text fontSize="14px">update image</Text>
                                            { imageUrl && !file ? (<Box w="50px" h="50px">
                                                <img src={imageUrl} alt={blogData.title} style={{ width: '100%', height: '100%', objectFit: 'cover'}}/>
                                            </Box>) : ( <Text>{ file?.name.substring(0, 15) }</Text> ) }
                                        </Box>
                                    </label>
                                </Box>

                                <Box>
                                    <FormLabel>Category</FormLabel>
                                    <Select variant='filled' placeholder='select..' name="categoryId" onChange={ blogDataHandler } required 
                                        value={blogDataInput.categoryId} 
                                    >
                                        { categories[0] && (
                                            categories.map(cat => {
                                                return (
                                                    <option key={cat.id} value={cat.id}>{ cat.category }</option>
                                                )
                                            })
                                        )}
                                    </Select>
                                </Box>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Blog</FormLabel>
                                <Textarea placeholder='Write you blog here...' focusBorderColor="primary" required
                                    name="description" value={blogDataInput.description} onChange={ blogDataHandler }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Box display="flex">
                                    <Input placeholder='Enter tags'  value={tagText} 
                                        onChange={ tagsHandler} focusBorderColor="primary"
                                        borderRight="none" borderTopRightRadius={0} borderBottomRightRadius={0}
                                    />
                                    <Button colorScheme="green" borderBottomLeftRadius={0}
                                        borderTopLeftRadius={0} onClick={ addTags }
                                    >Add</Button>
                                </Box>
                            </FormControl>

                            
                            <HStack spacing={4}>
                                {tags[0] && (
                                    tags.map((tag, i) => {
                                        return <SingleTag key={i} tag={tag} index={i} removeTagHandler={ removeTagHandler }/>
                                    })
                                )}
                            </HStack>

                        </ModalBody>
            
                        <ModalFooter display="flex" gap={2}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button colorScheme='blue' mr={3} type="submit">
                                { btnName }
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}