import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { SingleTag } from "./SingleTag";

interface ICreateBlog {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const CreateBlog = ({ isOpen, onOpen, onClose}: ICreateBlog) => {
    const [file, setFile] = useState<File | null>(null);
    const [tagText, setTagText] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [ blogData, setBlogData ] = useState({
        title: '',
        description: ''
    })

    const initialRef = useRef(null);

    const imageFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.currentTarget.files && e.currentTarget.files[0]);
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

    const blogDataHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlogData({
            ...blogData,
            [name]: value
        })
    }

    const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(file);
        console.log(blogData);
        console.log(tags);
    }
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
            <Toaster />
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={ submitFormHandler }>
                    <ModalHeader>Create your blog</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} display="flex" flexDir="column" gap={4}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input ref={initialRef} placeholder='Title' focusBorderColor="primary"
                                name="title" value={blogData.title} onChange={ blogDataHandler }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image</FormLabel>
                            <Input placeholder='File' type="file" id="file" display="none" 
                                onChange={ imageFileHandler } 
                            />
                            <label htmlFor="file" style={{ cursor: 'pointer'}}>
                                <Box display="flex" alignItems="center" gap="10px">
                                    <img src="./upload-img.png" alt="add image"
                                        style={{ width: '30px'}}
                                    />
                                    <Text fontSize="14px">Add image</Text>
                                    <Text>{ file?.name.substring(0, 15) }</Text>
                                </Box>
                            </label>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Blog</FormLabel>
                            <Textarea placeholder='Write you blog here...' focusBorderColor="primary"
                                name="description" value={blogData.description} onChange={ blogDataHandler }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Tags</FormLabel>
                            <Box display="flex">
                                <Input placeholder='Enter tags'  value={tagText} 
                                    onChange={ tagsHandler} focusBorderColor="primary"
                                    borderRight="none" borderTopRightRadius={0} borderBottomRightRadius={0}
                                />
                                <Button colorScheme="purple" borderBottomLeftRadius={0}
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
                            Publish
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
      </>
    )
  }