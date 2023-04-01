import { Icon } from '@chakra-ui/react';
import {
  MdHome,
} from 'react-icons/md';

// Auth Imports
import { IRoute } from 'types/navigation';

const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;

const routes: IRoute[] = userId ? [
  {
    name: 'Logout',
    path: '/logout',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
  },
  // other routes for logged-in users
] : [
  {
    name: 'Acessar Minha Conta',
    path: '/auth/sign-in/centered',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
    items: [],
  },
  {
    name: 'Cadastrar',
    path: '/auth/sign-up/centered',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
  },
];

export default routes;