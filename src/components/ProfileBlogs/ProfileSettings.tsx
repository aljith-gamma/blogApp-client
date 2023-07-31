import { Icon, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { AlertDialogBox } from "../AlertDialog/AlertDialogBox"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef } from "react";
import { EditBlog } from "../EditBlog/EditBlog";

interface ProfileBlogs {
    deleteBlog: () => void;
    title: string;
    description: string;
    tags: string[];
    categoryId: string;
    imageUrl: string;
    blogId: number;
}

export const ProfileSettings = ({ deleteBlog, title, description, tags, categoryId, imageUrl, blogId }: ProfileBlogs) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const cancelRef = useRef();

    return (
        <Menu>
            <EditBlog isOpen={isOpenEdit} onClose={onCloseEdit} title={title} description={description} tags={tags} categoryId={categoryId}
                imageUrl={imageUrl} blogId={blogId}
            />
            <MenuButton as={IconButton} size="sm"
                variant='flushed' icon={ <Icon as={ BsThreeDotsVertical} boxSize={5} /> } 
            />
            <MenuList>
                <MenuGroup>
                    <MenuItem onClick={ (e) => { 
                        e.stopPropagation();
                        onOpenEdit();
                    } }>Edit</MenuItem>
                    <MenuItem onClick={ onOpen }>Delete</MenuItem>
                </MenuGroup>
            </MenuList>
            { isOpen && <AlertDialogBox isOpen={ isOpen } onClose={ onClose } cancelRef={cancelRef} 
                dialogHeader="Delete" dialogBody="Do you really want to delete?" btnValue="Delete"
                submitHandler={ deleteBlog }
            />}
        </Menu>
    )
} 