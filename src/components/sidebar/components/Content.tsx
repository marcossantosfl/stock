'use client'
// chakra imports
import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
//   Custom components
import avatar4 from '/public/img/avatars/avatar4.png';
import { NextAvatar } from 'components/image/Avatar';
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import { PropsWithChildren } from 'react';
import { IRoute } from 'types/navigation';

// FUNCTIONS

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContent) {
  const { routes } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
