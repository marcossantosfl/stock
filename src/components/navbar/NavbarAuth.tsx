'use client'
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'components/link/Link';


// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';

// Assets
import routes from 'routes';
import { IRoute } from 'types/navigation';
import { useEffect } from 'react';

export default function AuthNavbar(props: {
  logo?: JSX.Element | string;
  logoText?: string;
  secondary?: boolean;
  sidebarWidth?: any;
}) {
  const { logoText, sidebarWidth } = props;

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };

  let logoColor = useColorModeValue('white', 'white');
  // Chakra color mode

  let mainText = '#fff';
  let navbarBg = 'none';
  let navbarShadow = 'initial';
  let bgButton = 'white';
  let colorButton = 'brand.500';
  let navbarPosition = 'absolute' as 'absolute';

  let brand = (
    <Link
      href='/home'
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Stack
        direction="row"
        spacing="12px"
        alignItems="center"
        justify="center"
      >
        <HorizonLogo h="26px" w="175px" color={logoColor} />
      </Stack>
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW="175px"
        href='/home'
        target="_blank"
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} />
      </Link>
    );
  }

  const linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }} spacing="20px">
      {routes.map((route) => (
        <Stack
          key={route.path}
          direction="row"
          spacing="4px"
          alignItems="center"
          color="#fff"
          fontWeight="bold"
          cursor="pointer"
          position="relative"
        >
          <Link href={route.path === '/logout' ? '' : route.path}
            onClick={route.path === '/logout' ? handleLogout : undefined} style={{ maxWidth: 'max-content' }}>
            <Text fontSize="sm" color={mainText}>
              {route.name}
            </Text>
          </Link>
        </Stack>
      ))}
    </HStack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top="16px"
        left="50%"
        transform="translate(-50%, 0px)"
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius="15px"
        px="16px"
        py="22px"
        mx="auto"
        width="1044px"
        maxW="90%"
        alignItems="center"
        zIndex="3"
      >
        <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }}>
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent="center"
            alignItems="center"
          >
            <SidebarResponsive routes={routes} />
          </Box>
          {linksAuth}
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}