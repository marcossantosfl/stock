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

import React, { ChangeEvent, useEffect, useRef  } from 'react';
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

const SignUp = () => {


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
  }, [isRegister, router]);

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
  const [isChecked, setIsChecked] = React.useState(false);
  const [phoneNumber, setphoneNumber] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errorUser, setErrorUser] = React.useState(null);
  const [errorAgree, setErrorAgree] = React.useState(null);


  const handlePhoneNumberChange = (phoneNumber) => {
    if (isValidNumber(phoneNumber)) {
      setError(null);
      setphoneNumber(phoneNumber);
    } else {
      setError("Invalid phone number");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setErrorAgree("You must agree to the Terms and Conditions and Privacy Policy");
    } else {
      setErrorAgree(null);
    }
  };

const handleCreateAccount = async () => {
  let error = false;

  if (!isChecked) {
    setErrorAgree("You must agree to the Terms and Conditions and Privacy Policy");
    error = true;
  } else {
    setErrorAgree(null);
  }

  if (!isValidNumber(phoneNumber)) {
    setError("Invalid phone number");
    error = true;
  } else {
    setError(null);
  }

  setErrorUser("")

  if (!error) {
    try {
      setIsLoading(true);
      const response = await fetch("https://api-stock-23gsh.ondigitalocean.app/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          agreedToTerms: isChecked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 400) {
        setErrorUser("This phone number is already registered");
        throw new Error("HTTP error " + response.status);
        }

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();

      localStorage.setItem("userId", JSON.stringify(data.userId))

      setTimeout(() => {
        router.push("/auth/verification/centered");
      }, 2000);
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
            Sign Up
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
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="start">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                  mt="3px"
                  isChecked={isChecked}
                  onChange={() => handleCheckboxChange ()}
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  By creating an account means you agree to the{' '}
                  <Link
                    href="https://simmmple.com/terms-of-service"
                    fontWeight="500"
                  >
                    Terms and Conditions,
                  </Link>{' '}
                  and our{' '}
                  <Link
                    href="https://simmmple.com/privacy-policy"
                    fontWeight="500"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
              </FormControl>
              
            </Flex>
            {errorAgree && (
      <FormLabel fontSize="sm" textAlign="center" color="red.500">
        {errorAgree}

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
      onClick={handleCreateAccount}
            >
              Create my account
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
              Already a member?
              <Link href="/auth/sign-in/centered">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign in
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

export default SignUp;