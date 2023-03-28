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
} from '@chakra-ui/react';
// Custom components
import React, { useEffect, useState, useMemo } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdExposureNeg1, MdAdd, MdOutlineEuroSymbol, MdOutlineEuro } from 'react-icons/md';
import Card from 'components/card/Card';
import axios from 'axios';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import Controller from 'components/admin/dashboards/smart-home/Controller';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function DashBoard() {
  const router = useRouter();
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButtons1, setIsLoadingButtons1] = useState([]);
  const [isLoadingButtons2, setIsLoadingButtons2] = useState([]);
  const [showEarnings, setShowEarnings] = useState(true);
  const [showToPay, setToPay] = useState(true);
  const [showMarkAsDelivered, setMarkAsDelivered] = useState(false);
  const [showReset, setReset] = useState(false);
  const [isLoadingMarkAsDelivered, setIsLoadingMarkAsDelivered] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [bill, setBill] = useState(null);


  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const yellowIcon = useColorModeValue('yellow.500', 'white');
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.50' }
  );
  const bgIconFocus = useColorModeValue(
    { bg: 'grey.100' },
    { bg: 'whiteAlpha.100' }
  );
  const shadow = useColorModeValue(
    '18px 17px 40px 4px rgba(112, 144, 176, 0.1)',
    'unset'
  );

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    setIsLoading(true);

    if(token == null)
    {
      localStorage.clear();
      router.push('/home');
    }
    
    fetch(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}`, {
      headers: {
        "Accept" : 'application/json',
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
  }, [userId]);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const headers = {
          "x-access-token": token,
          "Accept" : 'application/json',
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
  }, [isLoadingMarkAsDelivered]);
  


  const handleStockUpdate1 = async (index, action) => {
    if (isLoadingButtons1[index]) {
      // Stock is already being updated, do nothing
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
        "Accept" : 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}/${stock.id}`, { action }, { headers });
      if (response.data.message === 'Stock updated successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000)),
          new Promise<void>(resolve => setTimeout(() => {
            setStocks(prev => {
              const copy = [...prev];
              const stock = copy[index];
              if (action === 'subtract') {
                stock.amount -= 1;
              }
              return copy;
            });
            setIsLoadingButtons1(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });
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

  const handleMarkAsDelivered = async () => {

    setIsLoadingMarkAsDelivered(true);
    try {
      const headers = {
        "x-access-token": token,
        "Accept" : 'application/json',
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
    setIsLoadingReset(true);
    try {
      const headers = {
        "x-access-token": token,
        "Accept" : 'application/json',
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

  const goToBill = async () => {
    router.push('/user/end-bill');
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToBill
  });
  


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
        "Accept" : 'application/json',
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
            direction="column"

            align="center"
            justifyContent="center"
            pt={{ sm: '125px', lg: '75px' }}
            position="relative"
          >
            <Spinner size="lg" m="auto" mt="100px" display="block" color='white' zIndex="10" mb="36px" />
            <Text mb="36px"
              ms="4px"
              color="white"
              fontWeight="400"
              fontSize="lg" textAlign='center'>
              Loading...
            </Text>
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
                <SimpleGrid row={4} gap="10px" mb="10px" alignItems="center" alignContent="center" justifyContent="center" justifyItems="center">
                  {showEarnings && bill !== null && (
                    <MiniStatistics
                      startContent={
                        <IconBox
                          w="56px"
                          h="56px"
                          bg={boxBg}
                          icon={
                            <Icon
                              w="32px"
                              h="32px"
                              as={MdOutlineEuroSymbol}
                              color={brandColor}
                            />
                          }
                        />
                      }
                      name="Your Earnings"
                      value={`€${bill.earn}`}
                    />
                  )}
                  {showToPay && bill !== null && (
                    <MiniStatistics
                      startContent={
                        <IconBox
                          w="56px"
                          h="56px"
                          bg={boxBg}
                          icon={
                            <Icon
                              w="32px"
                              h="32px"
                              as={MdOutlineEuroSymbol}
                              color={brandColor}
                            />
                          }
                        />
                      }
                      name="To Pay"
                      value={`€${bill.toPayTotal}`}
                    />
                  )}

                  <SimpleGrid columns={2} gap="20px">
                    <Box onClick={() => setShowEarnings(!showEarnings)}>
                      <Controller
                        initial={true}
                        text="Show My Earnings"
                        onValue="ON"
                        offValue="OFF"
                        icon={MdOutlineEuroSymbol}
                      />
                    </Box>
                    <Box onClick={() => setToPay(!showToPay)}>
                      <Controller
                        initial={true}
                        text="Show To Pay"
                        onValue="ON"
                        offValue="OFF"
                        icon={MdOutlineEuro}
                      />
                    </Box>
                  </SimpleGrid>
                </SimpleGrid>
                {showMarkAsDelivered && (
                  <Button
                    isLoading={isLoadingMarkAsDelivered}
                    isDisabled={isLoadingMarkAsDelivered}
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
                <SimpleGrid columns={3} gap="30px" alignItems="center" justifyContent="center" textAlign="center">
                  {Array.isArray(stocks) &&
                    stocks.map((stock, index) => (
                      <React.Fragment key={index}>
                        <Flex
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          me={{ base: '22px', '2xl': '36px' }}
                        >
                          <IconButton
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            aria-label="Top"
                            borderRadius="50%"
                            isDisabled={isLoadingButtons1[index] || stock.amount == 0}
                            isLoading={isLoadingButtons1[index]}
                            onClick={() => handleStockUpdate1(index, 'subtract')}
                            bg={bgIconButton}
                            _hover={bgIconHover}
                            _active={bgIconFocus}
                            _focus={bgIconFocus}
                            w="56px"
                            h="56px"
                            mb="5px"
                            boxShadow={shadow}
                            icon={<Icon as={MdExposureNeg1} color={yellowIcon} w="24px" h="24px" />}
                          />
                          <Text fontSize="sm" fontWeight="500" color={textColor}>
                            Subtract -1
                          </Text>
                        </Flex>
                        <Flex
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          me={{ base: '22px', '2xl': '36px' }}
                        >
                          <Text color={textColor} fontSize="24px" fontWeight="700">
                            €{stock.amount * stock.value}
                          </Text>
                          <Text
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            w="max-content"
                            mb="10px"
                            fontSize="md"
                            p="6px 12px"
                            bg="linear-gradient(108.54deg, #FF416C 6.56%, #FF4B2B 95.2%)"
                            color="white"
                            borderRadius="10px"
                            fontWeight="700"
                          >
                            {stock.name}
                          </Text>
                        </Flex>
                        <Flex
                          direction="column"
                          align="center"
                          me={{ base: '22px', '2xl': '36px' }}
                        >
                          <IconButton
                            aria-label="Top"
                            borderRadius="50%"
                            isDisabled={isLoadingButtons2[index]}
                            isLoading={isLoadingButtons2[index]}
                            onDoubleClick={() => handleStockUpdate2(index, 'add')}
                            onClick={() => {

                            }}
                            bg={bgIconButton}
                            _hover={bgIconHover}
                            _active={bgIconFocus}
                            _focus={bgIconFocus}
                            w="56px"
                            h="56px"
                            mb="5px"
                            boxShadow={shadow}
                            icon={<Icon as={MdAdd} color={yellowIcon} w="24px" h="24px" />}
                          />
                          <Text fontSize="sm" fontWeight="500" color={textColor}>
                            Top Up
                          </Text>
                        </Flex>
                      </React.Fragment>
                    ))}
                </SimpleGrid>
                {showReset && (
                  <Button
                    isLoading={isLoadingReset}
                    isDisabled={isLoadingReset}
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