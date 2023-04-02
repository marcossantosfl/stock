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

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Chakra imports
import {
  Flex,
  Spinner,
} from '@chakra-ui/react';

// Custom components
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
const SignUp = () => {


  const router = useRouter()

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;

  useEffect(() => {
    typeof localStorage !== 'undefined' ? localStorage.clear() : null;

    router.push('/home')
  }, [userId]);

  return (
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
  );
}

export default SignUp;