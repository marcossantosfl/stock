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
  Flex,
  Text,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  IconButton,
  Icon,
  Select,
  Badge
} from '@chakra-ui/react';
// Custom components
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdEditSquare, MdSettingsBackupRestore } from 'react-icons/md';
import Card from 'components/card/Card';
import { useRouter } from 'next/navigation';

export default function DashBoard() {
  const router = useRouter();
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButtons1, setIsLoadingButtons1] = useState([]);
  const [isBlockButtons, setIsBlockButtons] = useState(false);
  const [isLoadingBack, setisLoadingBack] = useState(false);
  const [isChanging, setisChanging] = useState(false);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const redIcon = useColorModeValue('red.500', 'white');
  const greenIcon = useColorModeValue('green.500', 'white');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
  const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    setSelectedOptions(Array.from({ length: stocks.length }, () => '1'));
  }, [stocks.length]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      if (token == null) {
        localStorage.clear();
        router.push('/home');
      }

      fetch(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}`, {
        headers: {
          "Accept": 'application/json',
          "x-access-token": token
        }
      })
        .then(res => res.json())
        .then(data => {
          setStocks(data.stocks);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }, 100);
  }, [userId]);

  const handleBackDash = async () => {
    if (isLoadingBack) {
      return;
    }

    setisLoadingBack(true);
    setTimeout(() => {
      router.push('/user/dashboard');
    }, 300);

  };


  const handleOptionChange = (index, value) => {
    setSelectedOptions(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    stocks[index].amount = value;
  };

  const handleUpdate = async (index, id) => {
    if (isChanging) {
      return;
    }

    setIsLoadingButtons1((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    try {
      setisChanging(true);
      setIsBlockButtons(true);
      const response = await fetch(
        `http://localhost:8080/api/auth/stocks/${userId}/${id}/${stocks[index].amount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      setTimeout(() => {
        setisChanging(false);
        setIsBlockButtons(false);
        setIsLoadingButtons1((prev) => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
      }, 300);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setisChanging(false);
        setIsBlockButtons(false);
        setIsLoadingButtons1((prev) => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
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
        <CenteredAuth
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
            align="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center" justifySelf="center"
          >
            <Card p="30px" >
              {Array.isArray(stocks) &&
                stocks.map((stock, index) => (

                  <SimpleGrid key={index} columns={3} gap="10px" mt="30px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">

                    <Flex direction='column' justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                      <Text color={textColor} fontSize='md' me='6px' fontWeight='700'>
                        {stock.name}
                      </Text>
                      <Badge ml="1" fontSize="sm" colorScheme="green">
                        Qt: {stock.amount}
                      </Badge>
                      <Badge mt="4px" ml="1" fontSize="sm" colorScheme="purple">
                        Valor: €{stock.value}
                      </Badge>
                    </Flex>


                    <Flex
                      direction="column"
                      align="center"
                      alignContent="center"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                      justifyItems="center"
                      w="100%"
                    >

                      <Select
                        isDisabled={stock.amount <= 0 || isLoadingButtons1[index] || isBlockButtons}
                        ml="10px"
                        fontSize="sm"
                        id="quantity"
                        variant="main"
                        h="44px"
                        maxH="44px"
                        fontWeight="400"
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        value={selectedOptions[index] === '1' ? stock.amount : selectedOptions[index]}
                      >
                        {Array.from({ length: 500 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Select>
                    </Flex>


                    <Flex ml="20px" direction='column' align='center'>
                      <IconButton
                        isDisabled={stock.amount <= 0 || isLoadingButtons1[index] || isBlockButtons}
                        isLoading={isLoadingButtons1[index]}
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
                        onClick={(e) => handleUpdate(index, stock.id)}
                        icon={<Icon as={MdEditSquare} color={stock.amount <= 0 ? redIcon : greenIcon} w='24px' h='24px' />} />
                      <Text fontSize='sm' fontWeight='500' color={textColor}>
                        Alterar
                      </Text>
                    </Flex>
                  </SimpleGrid>


                ))}

              <SimpleGrid columns={1} gap="10px" mt="30px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                <Flex direction='column' align='center'>
                  <IconButton
                    isLoading={isLoadingBack}
                    isDisabled={isLoadingBack || isBlockButtons}
                    onClick={() => handleBackDash()}
                    aria-label='top'
                    borderRadius='50%'
                    bg={bgIconButton}
                    _hover={bgIconHover}
                    _active={bgIconFocus}
                    _focus={bgIconFocus}
                    w='56px'
                    h='56px'
                    mb='5px'
                    boxShadow={shadow}
                    icon={<Icon as={MdSettingsBackupRestore} color={'yellow.500'} w='24px' h='24px' />}
                  />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Voltar
                  </Text>
                </Flex>
              </SimpleGrid>
            </Card>
          </Flex>
        </CenteredAuth >
      )
      }
    </>
  );
}