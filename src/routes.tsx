import { Icon } from '@chakra-ui/react';
import {
  MdHome,
} from 'react-icons/md';

// Auth Imports
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Login',
    path: '/auth/sign-in/centered',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
    items: [
     
    ],
  },
  {
    name: 'Register',
    path: '/auth/sign-up/centered',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
  },
];

export default routes;
