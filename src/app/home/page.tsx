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
  Button,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';

// Assets
// Custom components
import HomeLayout from 'components/home/HomeLayout/page';
import Layout from 'app/auth/layout';
import Works from 'components/home/Works/Works';



function Home() {

  let bgButton = 'white';
  let colorButton = 'brand.500';

  return (
    <Layout>
      <HomeLayout
        image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
        contentTop={{ base: '140px', md: '14vh' }}
        contentBottom={{ base: '50px', lg: 'auto' }}
      >
        <Flex
          direction="column"
          alignSelf="center"
          justifySelf="center"
          overflow="hidden"
        >
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
            mb="38px"
          >
            <Text
              zIndex="1"
              fontSize="44px"
              color="white"
              fontWeight="700"
              maxW="550px"
              lineHeight="52px"
            >
              Stock.
            </Text>
            <Text
              zIndex="1"
              fontSize="md"
              color="white"
              fontWeight="normal"
              mt="10px"
              mb="26px"
              maxW="400px"
            >
              Controle o seu estoque a qualquer hora em qualquer lugar.
            </Text>
            <Link href="/auth/sign-in/centered">
            <Button
              zIndex="1"
              bg={bgButton}
              color={colorButton}
              fontSize="xs"
              variant="no-effects"
              borderRadius="50px"
              px="45px"
             
            >
              Acessar
            </Button>
          </Link>
          </Flex>
        </Flex>
      </HomeLayout>
    </Layout>
  );
}

export default Home;
