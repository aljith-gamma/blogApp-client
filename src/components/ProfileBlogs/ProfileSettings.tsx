import { Icon, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { AlertDialogBox } from "../AlertDialog/AlertDialogBox"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface ProfileBlogs {
    deleteBlog: () => void;
    blogId: number;
}

export const ProfileSettings = ({ deleteBlog, blogId }: ProfileBlogs) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const router = useRouter();
    
    return (
        <Menu>
            <MenuButton as={IconButton} size="sm"
                variant='flushed' icon={ <Icon as={ BsThreeDotsVertical} boxSize={5} /> } 
            />
            <MenuList>
                <MenuGroup>
                    <MenuItem onClick={ (e) => { 
                        e.stopPropagation();
                        router.push(`/edit/${blogId}`);
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