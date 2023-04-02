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
  Text,
  useColorModeValue,
  Spinner,
  IconButton,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
// Custom components
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdPayment, MdSettingsBackupRestore } from 'react-icons/md';
import Card from 'components/card/Card';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function DashBoard() {

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true);
  const [IsBackLoading, setIsBackLoading] = useState(false);
  const [isCloseDay, setisCloseDay] = useState(false);
  const [isCloseDaySuccess, setisCloseDaySuccess] = useState(false);
  const [isnoBills, setnoBills] = useState(false);
  const [bill, setBill] = useState(null);
  const balanceBg = useColorModeValue('brand.900', '#1B254B');
  const redIcon = useColorModeValue('red.500', 'white');
  const yellowIcon = useColorModeValue('yellow.500', 'white');
  const greenIcon = useColorModeValue('green.500', 'white');
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
  const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    setIsLoading(true);

    if (token == null) {
      localStorage.clear();
      router.push('/home');
    }

    const fetchBill = async () => {
      try {
        const headers = {
          "x-access-token": token,
          "Accept": 'application/json',
        };
        const response = await axios.get(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}`, { headers });
        setBill(response.data.bill);
        setTimeout(() => {

          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error(error);
        setTimeout(() => {

          setIsLoading(false);
        }, 300);
      }
    };

    fetchBill();
  }, [userId]);

  const handleBack = () => {

    setIsBackLoading(true);

    try {

      setTimeout(() => {

        router.push('/user/dashboard');

      }, 300);


    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const handleCloseDay = async () => {

    if (isCloseDay) {
      return;
    }

    setisCloseDay(true);

    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}/close/day`, {}, { headers });
      if (response.data.message === 'Bill day closed successfully') {
        setTimeout(() => {
          setisCloseDaySuccess(true);

          setTimeout(() => {
            router.push('/user/dashboard');
          }, 800);
        }, 300);

      }
      else if(response.data.error == 'No bills found to close')
      {
        setnoBills(true);
        setisCloseDay(false);
      }
    } catch (error: any) {
      onOpen();
      setTimeout(() => {
        setisCloseDaySuccess(false);
        setisCloseDay(false);
        setnoBills(false);
      }, 300);
    }
  };

  return (
    <>
      {isLoading ? (
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
        <><CenteredAuth
          image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
          cardTop={{ base: '140px', md: '24vh' }}
          cardBottom={{ base: '50px', lg: 'auto' }}
          showCard={true}
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

            <Card flexDirection="column" w="100%">
              <Flex hidden={isCloseDaySuccess}
                justify="space-between"
                p="20px"
                mb="20px"
                borderRadius="16px"
                bgColor={balanceBg}
                bgPosition="right"
                bgSize="cover"
              >
                <Flex align="center" justify="space-between" w="100%">
                  <Flex flexDirection="column" me="20px">
                    <Text color="white" fontSize="sm" fontWeight="500">
                      Ganhos
                    </Text>
                    <Text
                      color="white"
                      fontSize="34px"
                      fontWeight="700"
                      lineHeight="100%"
                    >
                      {`€${bill.earn}`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex hidden={isCloseDaySuccess}
                justify="space-between"
                p="20px"
                mb="20px"
                borderRadius="16px"
                bgColor={balanceBg}
                bgPosition="right"
                bgSize="cover"
              >
                <Flex align="center" justify="space-between" w="100%">
                  <Flex flexDirection="column" me="20px">
                    <Text color="white" fontSize="sm" fontWeight="500">
                      A Pagar
                    </Text>
                    <Text
                      color="white"
                      fontSize="34px"
                      fontWeight="700"
                      lineHeight="100%"
                    >
                      {`€${bill.toPay.toFixed(2)}`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex hidden={isCloseDaySuccess}
                justify="space-between"
                p="20px"
                mb="20px"
                borderRadius="16px"
                bgColor={balanceBg}
                bgPosition="right"
                bgSize="cover"
              >
                <Flex align="center" justify="space-between" w="100%">
                  <Flex flexDirection="column" me="20px">
                    <Text color="white" fontSize="sm" fontWeight="500">
                      Sistema
                    </Text>
                    <Text
                      color="white"
                      fontSize="34px"
                      fontWeight="700"
                      lineHeight="100%"
                    >
                      {`€${0}`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex hidden={!isCloseDaySuccess} mt="10px" direction='column' align='center'>
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle mr={2}>Successo</AlertTitle>
                  <AlertDescription>redirecionando...</AlertDescription>
                </Alert>
                <Spinner size="lg" m="auto" mt="20px" display="block" color='green.400' zIndex="10" mb="36px" />
              </Flex>

              <Flex hidden={!isnoBills} mt="10px" direction='column' align='center'>
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle mr={2}>Sem contas a pagar.</AlertTitle>
                </Alert>
              </Flex>

              <Flex hidden={isCloseDaySuccess}  justifyContent="space-around" alignItems="center" w="100%">
                <Flex mt="10px" ml="20px" direction='column' align='center'>
                  <IconButton
                    isLoading={IsBackLoading}
                    isDisabled={IsBackLoading || isCloseDay}
                    aria-label='transfer'
                    borderRadius='50%'
                    bg={bgIconButton}
                    _hover={bgIconHover}
                    _active={bgIconFocus}
                    _focus={bgIconFocus}
                    w='56px'
                    h='56px'
                    mb='5px'
                    boxShadow={shadow}
                    onClick={() => handleBack()}
                    icon={<Icon as={MdSettingsBackupRestore} color={yellowIcon} w='24px' h='24px' />} />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Voltar
                  </Text>
                </Flex>

                <Flex mt="10px" ml="20px" direction='column' align='center'>
                  <IconButton
                    isLoading={isCloseDay}
                    isDisabled={IsBackLoading || isCloseDay}
                    aria-label='transfer'
                    borderRadius='50%'
                    bg={bgIconButton}
                    _hover={bgIconHover}
                    _active={bgIconFocus}
                    _focus={bgIconFocus}
                    w='56px'
                    h='56px'
                    mb='5px'
                    boxShadow={shadow}
                    onClick={() => handleCloseDay()}
                    icon={<Icon as={MdPayment} color={greenIcon} w='24px' h='24px' />} />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Pagar
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </CenteredAuth>
          <Modal closeOnOverlayClick={false} isCentered
            motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Limpar carrinho</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="10px" align="center" justifyContent="center" alignItems="center">
                    <Text color="red.300" align="center" fontWeight="bold">
                      Você precisa limpar o seu carrinho
                    </Text>
                  </Stack>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Fechar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal></>
      )}
    </>
  );
}
