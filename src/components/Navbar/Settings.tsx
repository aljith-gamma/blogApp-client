
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AlertDialogBox } from "../AlertDialog/AlertDialogBox";
import { logoutUser } from "@/utils/auth";
import { toast } from "react-hot-toast";

export const Settings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const cancelRef = useRef()

    const logoutHandler = () => {
        logoutUser();
        router.push('/signin');
    }
    
    const redirectToProfile = () => {
        const id = localStorage.getItem('_id');
        if(!id) {
            toast.error('user has to login first!');
            logoutHandler();
        }else {
            router.push(`/profile/${id}`);
        }
    }


    return (
        <Menu>
            <MenuButton as={IconButton} 
                variant='flushed' icon={ <Avatar size='sm' onClick={ () => {} }/> }
            />
            <MenuList>
                <MenuGroup title='My Account'>
                    <MenuItem onClick={ redirectToProfile }>Profile</MenuItem>
                    <MenuItem onClick={onOpen}>Logout</MenuItem>
                </MenuGroup>
            </MenuList>
            { isOpen && <AlertDialogBox isOpen={ isOpen } onClose={ onClose } cancelRef={cancelRef} 
                dialogHeader="Logout" dialogBody="Do you really want to logout?" btnValue="Logout"
                submitHandler={ logoutHandler }
            />}
        </Menu>
    )
}