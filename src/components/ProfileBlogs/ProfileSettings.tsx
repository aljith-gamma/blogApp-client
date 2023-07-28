import { Icon, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { AlertDialogBox } from "../AlertDialog/AlertDialogBox"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef } from "react";

interface ProfileBlogs {
    deleteBlog: () => void;
}

export const ProfileSettings = ({ deleteBlog }: ProfileBlogs) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef()

    return (
        <Menu>
            <MenuButton as={IconButton} size="sm"
                variant='flushed' icon={ <Icon as={ BsThreeDotsVertical} boxSize={5} /> } 
            />
            <MenuList>
                <MenuGroup title='Blog'>
                    <MenuItem onClick={ (e) => { e.stopPropagation() } }>Edit</MenuItem>
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