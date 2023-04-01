'use client'
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  PinInput,
  PinInputField,
  Heading,
  Text,
  useColorModeValue,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import CenteredAuth from '../../../../components/auth/variants/CenteredAuthLayout/page';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ForgotPassword() {

  const router = useRouter()


  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;


  // Chakra color mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const blueColor = useColorModeValue('blue.500', 'white');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingResend, setIsLoadingResend] = React.useState(false);
  const [error, setError] = React.useState('');
  const [errorInvalid, setErrorInvalid] = React.useState('');
  const [errorResend, setErrorResend] = React.useState('');
  const [otpDigit1, setOtpDigit1] = React.useState("");
  const [otpDigit2, setOtpDigit2] = React.useState("");
  const [otpDigit3, setOtpDigit3] = React.useState("");
  const [otpDigit4, setOtpDigit4] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isSigned, setIsSigned] = React.useState(true);
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    if (userId) {

      setTimeout(() => {
        setIsSigned(false);
      }, 1500);
    }

    if (!userId) {
      //setTimeout(() => {
        router.push("/home");
      //}, 3000);
    }
  }, [userId]);

  const handleOtpDigit1Change = (event) => {
    setOtpDigit1(event.target.value);
  };

  const handleOtpDigit2Change = (event) => {
    setOtpDigit2(event.target.value);
  };

  const handleOtpDigit3Change = (event) => {
    setOtpDigit3(event.target.value);
  };

  const handleOtpDigit4Change = (event) => {
    setOtpDigit4(event.target.value);
  };

  const handleUnlock = async () => {

    if(isLoading)
    {
      return;
    }

    if (!otpDigit1 || !otpDigit2 || !otpDigit3 || !otpDigit4) {
      setError("Digite o código  recebido via mensagem no seu celular.");
      return;
    }

    try {
      setErrorInvalid("");
      setError("");
      setErrorResend("");
      setIsLoading(true);
      const otp = `${otpDigit1}${otpDigit2}${otpDigit3}${otpDigit4}`;
      const response = await fetch("https://api-stock-23gsh.ondigitalocean.app/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ otp: otp, userId: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken)

      // do something with the response data
      setTimeout(() => {
        router.push("/user/new-user");
      }, 1500);
    } catch (error) {
      setErrorInvalid("Codigo inválido, tente novamente.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {

    if(isLoadingResend)
    {
      return;
    }

    setErrorInvalid("");
    setError("");
    setErrorResend("");

    try {
      setIsLoadingResend(true);
      const response = await fetch("https://api-stock-23gsh.ondigitalocean.app/api/auth/resend", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();
      setTimeout(() => {
        setSuccess("Um novo codigo foi enviado para o seu celular");
        setIsLoadingResend(false);
      }, 2000);
      
    } catch (error) {
      setTimeout(() => {
        setErrorResend("Falha em reenviar o codigo, tente novamente");
        setIsLoadingResend(false);
      }, 2000);
      console.error(error);
    }
  };

  return (
    <>
      {isSigned ? (
        <CenteredAuth
        image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
        cardTop={{ base: '140px', md: '14vh' }}
        cardBottom={{ base: '50px', lg: '100px' }}
        showCard={true}
        cardSx={{ bg: 'none' }}
      >
        <Flex
          w="100%"
          maxW="max-content"
          mx={{ base: 'auto', lg: '0px' }}
          me="auto"
          h="100%"
          justifyContent="center"
          px={{ base: '25px', md: '0px' }}
          flexDirection="column"
        >
          <Spinner size="lg" m="auto" mt="100px" display="block" color='white' zIndex="10" mb="36px" />
        </Flex>
      </CenteredAuth>
      ) : (

            <CenteredAuth
              image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
              cardTop={{ base: '140px', md: '24vh' }}
              cardBottom={{ base: '50px', lg: 'auto' }}
            >
              <Flex
                w="100%"
                maxW="max-content"
                mx={{ base: 'auto', lg: '0px' }}
                me="auto"
                h="100%"
                justifyContent="center"
                px={{ base: '25px', md: '0px' }}
                flexDirection="column"
              >
                <Box me="auto" mb="34px">
                  <Heading
                    color={textColor}
                    fontSize="36px"
                    mb="16px"
                    mx={{ base: 'auto', lg: 'unset' }}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    OTP verificação
                  </Heading>
                  <Text
                    color={textColorSecondary}
                    fontSize="md"
                    maxW={{ base: '95%', md: '100%' }}
                    mx={{ base: 'auto', lg: 'unset' }}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    Entre o codigo de verificação para confirmar sua conta!
                  </Text>
                </Box>
                <Flex
                  zIndex="2"
                  direction="column"
                  w={{ base: '100%', md: '425px' }}
                  maxW="100%"
                  background="transparent"
                  borderRadius="15px"
                  mx={{ base: 'auto', lg: 'unset' }}
                  me="auto"
                  mb={{ base: '20px', md: 'auto' }}
                >
                  <FormControl>
                    <Flex justify="center">
                      <PinInput otp>
                        <PinInputField
                          readOnly={isLoading}
                          fontSize="36px"
                          color={textColor}
                          borderRadius="16px"
                          borderColor={borderColor}
                          h={{ base: '63px', md: '95px' }}
                          w={{ base: '63px', md: '95px' }}
                          me="10px"
                          value={otpDigit1}
                          onChange={handleOtpDigit1Change}
                        />
                        <PinInputField
                          readOnly={isLoading}
                          fontSize="36px"
                          color={textColor}
                          borderRadius="16px"
                          borderColor={borderColor}
                          h={{ base: '63px', md: '95px' }}
                          w={{ base: '63px', md: '95px' }}
                          me="10px"
                          value={otpDigit2}
                          onChange={handleOtpDigit2Change}
                        />
                        <PinInputField
                          readOnly={isLoading}
                          fontSize="36px"
                          color={textColor}
                          borderRadius="16px"
                          borderColor={borderColor}
                          h={{ base: '63px', md: '95px' }}
                          w={{ base: '63px', md: '95px' }}
                          me="10px"
                          value={otpDigit3}
                          onChange={handleOtpDigit3Change}
                        />
                        <PinInputField
                          readOnly={isLoading}
                          fontSize="36px"
                          color={textColor}
                          borderRadius="16px"
                          borderColor={borderColor}
                          h={{ base: '63px', md: '95px' }}
                          w={{ base: '63px', md: '95px' }}
                          value={otpDigit4}
                          onChange={handleOtpDigit4Change}
                        />
                      </PinInput>
                    </Flex>
                    {error && (
                      <FormLabel fontSize="sm" textAlign="center" color="red.500">
                        {error}
                      </FormLabel>
                    )}
                    <Button
                       _loading={{bg:blueColor}}
                      disabled={isLoading}
                      fontSize="14px"
                      variant="brand"
                      borderRadius="16px"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                      mt="12px"
                      isLoading={isLoading}
                      onClick={handleUnlock}
                    >
                      Confirmar

                    </Button>
                    {errorInvalid && (
                      <FormLabel fontSize="sm" textAlign="center" color="red.500">
                        {errorInvalid}
                      </FormLabel>
                    )}
                  </FormControl>
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="start"
                    maxW="100%"
                    mt="0px"
                  >
                    <Text
                      opacity={isLoading ? 0 : 1}
                      color={textColorDetails}
                      fontWeight="400"
                      fontSize="14px"
                      mx={{ base: 'auto', lg: 'unset' }}
                      textAlign={{ base: 'center', lg: 'left' }}

                    >
                      Não recebeu?

                      <Text onClick={handleResendCode} color={textColorBrand} style={{ cursor: 'pointer' }} as="span" ms="5px" fontWeight="500">
                        {isLoadingResend ? "Loading..." : "Resend a new code"}
                      </Text>
                      {errorResend && <Text fontSize="14px" color="red">{errorResend}</Text>}
                      {success && <Text fontSize="14px" color="green">{success}</Text>}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </CenteredAuth>
      )}
    </>
  );
}

export default ForgotPassword;