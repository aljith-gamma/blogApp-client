import { resendOtp, verifyUser } from "@/apis/auth";
import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Text, useDisclosure } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

interface IOtpModal {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

interface IOtpValues {
    first: string;
    second: string;
    third: string;
    fourth: string;
}

export const OtpModal = ({ isOpen, onClose, email }: IOtpModal) => {
    const [ otpValues, setOtpValues ] = useState<IOtpValues>({
        first: '',
        second: '',
        third: '',
        fourth: ''
    })
    const [load, setLoad] = useState(false);
    const router = useRouter();
    const toastId = useRef<string | null>(null);

    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const mutation = useMutation({
        mutationFn: async (otp: string) => {
          const response = await verifyUser({ otp, email});
          if(response?.status){
              router.push('/blog');
              onClose();
          }
        }
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setOtpValues({
            ...otpValues,
            [name]: value
        })
    }

    const submitOtp = () => {
        let flag = false;
        if(!otpValues.first) flag = true;
        if(!otpValues.second) flag = true;
        if(!otpValues.third) flag = true;
        if(!otpValues.fourth) flag = true;

        if(toastId.current) toast.dismiss(toastId.current);
        if(flag){
          toastId.current = toast.error('OTP must have 4 numbers!');
        }else{
          const otp = `${otpValues.first}${otpValues.second}${otpValues.third}${otpValues.fourth}`;
          mutation.mutate(otp);
        }
    }

    const resendEmail = async () => {
      setLoad(true);
      const res = await resendOtp(email);
      setLoad(false);
    }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} >
        <Toaster />
        { (load || mutation.isLoading) && <Loader />}
        {OverlayOne()}
        <ModalContent p={5} m={5}>
          <ModalHeader textAlign="center" fontSize="2xl">Verification Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" py={2} flexDir="column"
            alignItems="center" gap={6}
          >
            <Text textAlign="center" fontSize="md" color="gray.600">Please enter the verification code sent to 
                <Text fontWeight="500" fontSize="md" color="gray.800">{ email }</Text>
            </Text>
            <HStack>
                <PinInput otp size="lg">
                    <PinInputField border="1px solid rgba(0, 0, 0, 0.3)" bgColor="#C8E0EC" name="first"
                        value={otpValues.first} onChange={handleChange}
                    />
                    <PinInputField border="1px solid rgba(0, 0, 0, 0.3)" bgColor="#C8E0EC" name="second"
                        value={otpValues.second} onChange={handleChange}
                    />
                    <PinInputField border="1px solid rgba(0, 0, 0, 0.3)" bgColor="#C8E0EC" name="third"
                        value={otpValues.third} onChange={handleChange}
                    />
                    <PinInputField border="1px solid rgba(0, 0, 0, 0.3)" bgColor="#C8E0EC" name="fourth"
                        value={otpValues.fourth} onChange={handleChange}
                    />
                </PinInput>
            </HStack>
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={2}>
                <Text fontSize="sm" color="gray.500">Didn't recieve an OTP?</Text>
                <Text fontSize="sm" color="gray.700" fontWeight="500" textDecoration="underline"
                    cursor="pointer" onClick={resendEmail}
                >
                    Resend OTP?
                </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={submitOtp} w="full" colorScheme='linkedin'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}