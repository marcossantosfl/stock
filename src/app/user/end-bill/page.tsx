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
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdOutlineEuroSymbol } from 'react-icons/md';
import Card from 'components/card/Card';
import axios from 'axios';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { useRouter } from 'next/navigation';

export default function DashBoard() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [IsBackLoading, setIsBackLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    setIsLoading(true);

    if(token == null)
    {
      localStorage.clear();
      router.push('/home');
    }

    const fetchBill = async () => {
      try {
        const headers = {
          "x-access-token": token,
          "Accept" : 'application/json',
        };
        const response = await axios.get(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}`, { headers });
        setBill(response.data.bill);
        if (response.data.bill.end) {
          //router.push('/user/end-bill');
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchBill();
  }, [userId]);

  const handleBack = () => {

    setIsBackLoading(true);

    try {

      setTimeout(() => {

        router.push('/user/dashboard');

      }, 1000);


    } catch (error) {
      console.error(JSON.stringify(error));
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
              <SimpleGrid row={3} gap="10px" mb="10px" alignItems="center" alignContent="center" justifyContent="center" justifyItems="center">

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
                  name="System Bill"
                  value={`€${bill.toPay.toFixed(2)}`}
                />

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
                  name="Stock To Pay"
                  value={`€${bill.toPayTotal.toFixed(2)}`}
                />
              </SimpleGrid>

              <Flex gap="10px" mb="10px" alignItems="center" alignContent="center" justifyContent="center" justifyItems="center">
                <Button
                  isLoading={IsBackLoading}
                  isDisabled={IsBackLoading}
                  mb="10px"
                  mt="20px"
                  onClick={() => handleBack()}
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                >
                  Back.
                </Button>
                <Button
                  //isLoading={IsBackLoading}
                  isDisabled={IsBackLoading}
                  mb="10px"
                  mt="20px"
                  //onDoubleClick={() => handleEndDay()}
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                >
                  Pay.
                </Button>
              </Flex>
            </Card>
          </Flex>
        </CenteredAuth>
      )}
    </>
  );
}