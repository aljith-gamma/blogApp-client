
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AlertDialogBox } from "../AlertDialog/AlertDialogBox";
import { logoutUser } from "@/utils/auth";

export const Settings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const cancelRef = useRef()

    const redirectToProfile = () => {
        router.push('/profile');
    }

    const logoutHandler = () => {
        logoutUser();
        router.push('/signin');
    }

    return (
        <Menu>
            <MenuButton as={IconButton} 
                variant='flushed' icon={<Avatar size='sm' bgColor="primary" onClick={ () => {} }/> }
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