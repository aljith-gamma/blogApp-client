import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"

interface IAlertDialogBox {
    isOpen: boolean;
    onClose: () => void;
    cancelRef: any;
    dialogHeader: string;
    dialogBody: string;
    btnValue: string;
    submitHandler: () => void;
}

export const AlertDialogBox = ({ isOpen, onClose, cancelRef, dialogHeader, dialogBody, btnValue, submitHandler }: IAlertDialogBox) => {

    const handleClick = () => {
        submitHandler();
        onClose();
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    { dialogHeader }
                </AlertDialogHeader>

                <AlertDialogBody>
                    {dialogBody}
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={ handleClick } ml={3}>
                    { btnValue }
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}