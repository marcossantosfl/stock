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

import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'components/link/Link';

// Custom components
import CenteredAuth from '../../../../components/auth/variants/CenteredAuthLayout/page';

// Assets
import PhoneNumberInput from 'components/phone/phone';
import { COUNTRIES } from 'components/phone/countries';

import { isValidNumber } from "libphonenumber-js";

const SignIn = () => {


  const router = useRouter()

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;

  const [isRegister, setIsRegister] = React.useState(false);

  useEffect(() => {
    if (userId) {
      setIsRegister(true);
    }
  }, [userId]);

  useEffect(() => {
    if (isRegister) {
      setTimeout(() => {
        router.push("/auth/verification/centered");
      }, 2000);
    }
  }, [isRegister]);

  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));
  const [isLoading, setIsLoading] = React.useState(false);
  const [phoneNumber, setphoneNumber] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errorUser, setErrorUser] = React.useState(null);


  const handlePhoneNumberChange = (phoneNumber) => {
    if (isValidNumber(phoneNumber)) {
      setError(null);
      setphoneNumber(phoneNumber);
    } else {
      setError("Invalid phone number");
    }
  };

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
  
    let error = false;
  
    if (!isValidNumber(phoneNumber)) {
      setError("Invalid phone number");
      error = true;
    } else {
      setError(null);
    }
  
    setIsLoading(true);
    setErrorUser("");
  
    if (!error) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            phoneNumber: phoneNumber,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 404) {
          setErrorUser("User not found");
          throw new Error("HTTP error " + response.status);
        }
  
        if (response.status === 500) {
          setErrorUser("SMS not sent");
          throw new Error("HTTP error " + response.status);
        }
  
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
  
        const data = await response.json();
  
        localStorage.setItem("userId", JSON.stringify(data.userId));
  
        setTimeout(() => {
          router.push("/auth/verification/centered");
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };  

  return (
    <>
      {isRegister ? (
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
          cardTop={{ base: '140px', md: '14vh' }}
          cardBottom={{ base: '50px', lg: '100px' }}
        >
          <Flex
            maxW="max-content"
            mx={{ base: 'auto', lg: '0px' }}
            me="auto"
            justifyContent="center"
            px={{ base: '20px', md: '0px' }}
            flexDirection="column"
          >
            <Box me="auto">
              <Heading
                color={textColor}
                fontSize={{ base: '34px', lg: '36px' }}
                mb="10px"
              >
                Login
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Enter your phone number.
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
            >
              <FormControl>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Phone Number<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <PhoneNumberInput
                    isDisabled={isLoading}
                    isRequired={true}
                    size="lg"
                    type="tel" placeholder="phone number" borderRadius="16px"
                    value={phoneNumber}
                    options={countryOptions}
                    onChange={phoneNumber => handlePhoneNumberChange(phoneNumber)} country={undefined}
                  />

                </InputGroup>
                {error && (
                  <FormLabel textAlign="center" fontSize="sm" color="red.500">
                    {error}
                  </FormLabel>
                )}
                {errorUser && (
                  <FormLabel fontSize="sm" textAlign="center" color="red.500">
                    {errorUser}
                  </FormLabel>
                )}
                <Button
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  isLoading={isLoading}
                  //isDisabled={isLoading}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="sm">
                  Don't you have an account?
                  <Link href="/auth/sign-up/centered">
                    <Text
                      color={textColorBrand}
                      as="span"
                      ms="5px"
                      fontWeight="500"
                    >
                      Sign up
                    </Text>
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>

        </CenteredAuth>
      )}
    </>
  );
}

export default SignIn;