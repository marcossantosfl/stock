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
  Button,
  Icon,
  Box,
  Select,
  FormLabel,
} from '@chakra-ui/react';
// Custom components
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdAddCircle, MdAddCircleOutline, MdCached, MdDomain, MdElectricCar, MdSchool } from 'react-icons/md';
import Card from 'components/card/Card';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEthereum } from 'react-icons/fa';

export default function DashBoard() {
  const router = useRouter();
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButtons1, setIsLoadingButtons1] = useState([]);
  const [isLoadingButtons2, setIsLoadingButtons2] = useState([]);
  const [showMarkAsDelivered, setMarkAsDelivered] = useState(false);
  const [showReset, setReset] = useState(false);
  const [isLoadingMarkAsDelivered, setIsLoadingMarkAsDelivered] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [bill, setBill] = useState(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const greenIcon = useColorModeValue('green.500', 'white');
  const ethColor = useColorModeValue('gray.700', 'white');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const [selectedOption, setSelectedOption] = useState({ 0: '1' });
  const options = Array.from({ length: 100 }, (_, i) => `${i + 1}`);
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
  const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

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
        })
        .catch(err => {
          console.error(err);
        });
    }, 2000);
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      const fetchBill = async () => {
        try {
          const headers = {
            "x-access-token": token,
            "Accept": 'application/json',
          };
          const response = await axios.get(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}`, { headers });
          setBill(response.data.bill);
          if (response.data.bill.end) {
            //router.push('/user/end-bill'); // Replace '/thank-you-page' with the path to your desired page
          }
          //end of the bill
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchBill();
    }, 2000);
  }, [isLoadingMarkAsDelivered]);

  const handleMarkAsDelivered = async () => {

    if (isLoadingMarkAsDelivered) {
      return;
    }

    setIsLoadingMarkAsDelivered(true);
    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}/mark-as-delivered`, {}, { headers });
      if (response.data.message === 'Bill marked as delivered successfully') {
        // Do something after the bill has been marked as delivered
        setTimeout(() => {
          setIsLoadingMarkAsDelivered(false);
          setMarkAsDelivered(false);
          setReset(true);
        }, 1000);

      }
    } catch (error) {
      console.error(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingMarkAsDelivered(false);
      }, 1000);
    }
  };

  const handleEndDay = async () => {

    if (isLoadingReset) {
      return;
    }

    setIsLoadingReset(true);
    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}/close`, { action: "close" }, { headers });
      if (response.data.message === 'Bill closed') {
        // Do something after the bill has been marked as delivered
        setTimeout(() => {
          router.push('/user/end-bill');
          //setIsLoadingReset(false);
        }, 1000);

      }
    } catch (error) {
      console.error(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingReset(false);
      }, 1000);
    }
  };


  const handleStockUpdate1 = async (index, action) => {
    if (isLoadingButtons1[index]) {
      // Stock is already being updated or a long press is in progress, do nothing
      return;
    }

    setIsLoadingButtons1(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    try {
      const stock = stocks[index];
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const data = {
        action,
        quantity: selectedOption[index]
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}/${stock.id}`, data, { headers });
      if (response.data.message === 'Stock updated successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000)),
          new Promise<void>(resolve => setTimeout(() => {
            setStocks(prev => {
              const copy = [...prev];
              const stock = copy[index];
              if (action === 'subtract') {
                stock.amount -= selectedOption[index];
              }
              return copy;
            });
            setIsLoadingButtons1(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });

            setSelectedOption(prev => ({ ...prev, [index]: '0' }));

            resolve();
          }, 1000))
        ]);


        setMarkAsDelivered(true);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setIsLoadingButtons1(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
      }, 1000);
    }
  };

  const handleStockUpdate2 = async (index, action) => {
    if (isLoadingButtons2[index]) {
      // Stock is already being updated, do nothing
      return;
    }

    setIsLoadingButtons2(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    try {
      const stock = stocks[index];
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}/${stock.id}`, { action }, { headers });
      if (response.data.message === 'Stock updated successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000)),
          new Promise<void>(resolve => setTimeout(() => {
            setStocks(prev => {
              const copy = [...prev];
              const stock = copy[index];
              if (action === 'add') {
                stock.amount += 1;
              }
              return copy;
            });
            setIsLoadingButtons2(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });
            resolve();
          }, 1000))
        ]);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingButtons2(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
      }, 1000);
    }
  };


  const handleOptionChange = (index, value) => {
    setSelectedOption({ ...selectedOption, [index]: value });
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
          >
            <Card p="30px">
              <SimpleGrid row={2} gap="10px" mb="10px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                <Flex
                  bg={ethBg}
                  display='flex'
                  borderRadius="30px"
                  ms="auto"
                  p="6px"
                  align="center"
                  me="6px"
                >
                  <Flex
                    align="center"
                    justify="center"
                    bg={ethBox}
                    h="29px"
                    w="29px"
                    borderRadius="30px"
                    me="7px"
                  >
                    <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
                  </Flex>
                  <Text
                    w="max-content"
                    color={ethColor}
                    fontSize="sm"
                    fontWeight="700"
                    me="6px"
                  >
                    {`Ganhos ${bill.earn}`}
                    <Text as="span" display={{ base: 'none', md: 'unset' }}>
                      {' '}
                      €
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  bg={ethBg}
                  display='flex'
                  borderRadius="30px"
                  ms="auto"
                  p="6px"
                  align="center"
                  me="6px"
                >
                  <Flex
                    align="center"
                    justify="center"
                    bg={ethBox}
                    h="29px"
                    w="29px"
                    borderRadius="30px"
                    me="7px"
                  >
                    <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
                  </Flex>
                  <Text
                    w="max-content"
                    color={ethColor}
                    fontSize="sm"
                    fontWeight="700"
                    me="6px"
                  >
                    {`A Pagar ${bill.toPayTotal}`}
                    <Text as="span" display={{ base: 'none', md: 'unset' }}>
                      {' '}
                      €
                    </Text>
                  </Text>
                </Flex>
              </SimpleGrid>
              {showMarkAsDelivered && (
                <Button
                  isLoading={isLoadingMarkAsDelivered}
                  //isDisabled={isLoadingMarkAsDelivered}
                  mb="10px"
                  mt="10px"
                  onClick={() => handleMarkAsDelivered()}
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                >
                  Mark as delivered
                </Button>
              )}

              <Text mt="10px" color="secondaryGray.600" fontWeight="500" fontSize="sm" mb="10px">
                Estoque restante
              </Text>
              {Array.isArray(stocks) &&
                stocks.map((stock, index) => (
                  <Flex justifyContent='center' gap="20px" mb="30px" alignItems='center' textAlign='center' justifyItems='center' w='100%'>
                    <Flex direction='column' align='center' me='auto'>
                      <Text color={textColor} fontSize='md' me='6px' fontWeight='700'>
                        {stock.name}
                      </Text>
                      <Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
                        {stock.value * stock.amount}
                      </Text>
                    </Flex>


                    <Flex direction='column' align='center' alignContent='center' justifyContent='center' alignItems='center' textAlign='center' justifyItems='center' w='100%'>

                      <Select
                        ml="20px"
                        fontSize="sm"
                        id="quantity"
                        variant="main"
                        h="44px"
                        maxH="44px"
                        minW="44px"
                        fontWeight="400"
                        defaultValue={1}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        value={selectedOption[index]}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Flex>


                    <Flex ml="20px" direction='column' align='center'>
                      <IconButton
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
                        onClick={(e) => handleStockUpdate1(index, 'subtract')}
                        icon={<Icon as={MdAddCircle} color={greenIcon} w='24px' h='24px' />}
                      />
                      <Text fontSize='sm' fontWeight='500' color={textColor}>
                        Vender
                      </Text>
                    </Flex>
                  </Flex>
                ))}

              {showReset && (
                <Button
                  isLoading={isLoadingReset}
                  //isDisabled={isLoadingReset}
                  mb="10px"
                  mt="20px"
                  onClick={() => handleEndDay()}
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                >
                  CLOSE STOCK.
                </Button>
              )}
            </Card>
          </Flex>
        </CenteredAuth>
      )}
    </>
  );
}