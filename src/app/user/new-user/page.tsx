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
  FormLabel,
  Icon,
  IconButton,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import InputField from 'components/fields/InputField';
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdAdd, MdOutlineDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Statistics from 'components/admin/main/account/application/MiniStatistics';
import IconBox from 'components/icons/IconBox';
export default function NewUser() {

  const router = useRouter()

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {

    if (!userId) {
      router.push('/home');
    }

    if (token == null) {
      localStorage.clear();
      router.push('/home');
    }

  }, [userId, token]);

  useEffect(() => {
    const storedStocks = localStorage.getItem("stocks");
    if (storedStocks) {
      setStocks(JSON.parse(storedStocks));
    }
  }, []);

  const yellowIcon = useColorModeValue('yellow.500', 'white');
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
  const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
  const [stocks, setStocks] = useState([]);
  const [currentStock, setCurrentStock] = useState('');
  const [currentAmount, setCurrentAmount] = useState(null);
  const [error, setError] = React.useState('');
  const [errorRequest, setErrorRequest] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIisSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const options = Array.from({ length: 100 }, (_, i) => `${i + 1}`);

  // Chakra Color Mode

  const handleInput = (e) => {
    setCurrentStock(e.target.value);
  };

  const handleAmountInput = (e) => {
    setCurrentAmount(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddStock = () => {

    if(isLoading)
    {
      return;
    }

    setIsLoading(true);
    if (!currentStock || currentAmount <= 0 || Number(selectedOption) <= 0) {
      setError("You must fill the fields");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setError("");
      setStocks([...stocks, { name: currentStock, value: currentAmount, amount: Number(selectedOption) }]);
      localStorage.setItem("stocks", JSON.stringify([...stocks, { name: currentStock, value: currentAmount, amount: Number(selectedOption) }]));
    }, 1000);
  };

  const handleDeleteStock = (index) => {
    const newStocks = [...stocks];
    newStocks.splice(index, 1);
    setStocks(newStocks);
    localStorage.setItem("stocks", JSON.stringify(newStocks));
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      return;
    }
  
    setIisSubmitted(true);
    setErrorRequest('');
  
    if (!stocks || stocks.length === 0) {
      setError('You must add at least one stock');
      setIisSubmitted(false);
      return;
    }
  
    try {
      const response = await fetch('https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          stocks: stocks,
          userId: userId,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to create stocks');
      }
  
      setTimeout(() => {
        router.push('/user/dashboard');
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setErrorRequest('Fail to create a stock.');
        setIisSubmitted(false);
      }, 1000);
    }
  };
  

  return (
    <CenteredAuth
      image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
      cardTop={{ base: '140px', md: '24vh' }}
      cardBottom={{ base: '50px', lg: 'auto' }}
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
        <Flex direction="column" w="100%">
          <Stack direction="column" spacing="10px" align="center" justifyContent="center" alignItems="center">
            <Text align="center" fontWeight="bold">
              Create a new stock
            </Text>
            <SimpleGrid row={{ base: 1, md: 2 }} gap="2px" justifyContent="center" alignItems="center">
              <InputField
                label='Name of product'
                mb="10px"
                placeholder="Tomato"
                type="text"
                align="center"
                onChange={handleInput}
                value={currentStock} />
              <InputField
                label='Price of the product'
                placeholder="50€"
                mb="10px"
                type="text"
                align="center"
                onChange={handleAmountInput}
                value={currentAmount} />
              <FormLabel
                ms="10px"
                htmlFor="quantity"
                fontSize="sm"
                color={textColor}
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Quantity
              </FormLabel>
              <Select
                fontSize="sm"
                id="quantity"
                variant="main"
                h="44px"
                maxH="44px"
                fontWeight="400"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              {error && (
                <FormLabel fontSize="sm" textAlign="center" color="red.500">
                  {error}
                </FormLabel>
              )}
            </SimpleGrid>
            <IconButton
              isLoading={isLoading}
              aria-label='top'
              borderRadius='50%'
              bg={bgIconButton}
              _hover={bgIconHover}
              _active={bgIconFocus}
              _focus={bgIconFocus}
              w='56px'
              h='56px'
              mb='5px'
              boxShadow={shadow}
              onClick={handleAddStock}
              icon={
                <Icon as={MdAdd} color={yellowIcon} w='24px' h='24px' />
              }
            />

            {stocks.length > 0 && (
              <Text align="center" fontWeight="bold">Stocks added</Text>
            )}
            {stocks.map((stock, index) => (
              <><Statistics
                focused={true}
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                title={`€${stock.value}`}
                value={stock.name}
                detail={<Flex align="center">
                  <Text color="white" fontSize="sm" fontWeight="500">
                    You have {stock.amount} left.
                  </Text>
                  <Text color="white" fontSize="sm" fontWeight="500">
                    - Total: €{stock.amount * stock.value}
                  </Text>
                </Flex>}
                illustration={<IconBox
                  onClick={() => handleDeleteStock(index)}
                  ml="20px"
                  w="80px"
                  h="80px"
                  bg="linear-gradient(290.56deg, #868CFF -18.35%, #4318FF 60.45%)"
                  icon={<Icon
                    as={MdOutlineDelete}
                    w="38px"
                    h="38px"
                    color="white" />} />} /></>
            ))}
          </Stack>
          {errorRequest && (
            <FormLabel mt="10px" fontSize="sm" textAlign="center" color="red.500">
              {errorRequest}
            </FormLabel>
          )}
          <Flex mt="20px" justify="center">
            <Button
              isLoading={isSubmitted}
              isDisabled={isSubmitted || stocks.length === 0}
              variant="brand"
              minW="183px"
              fontSize="sm"
              fontWeight="500"
              onClick={() => handleSubmit()}
            >
              Create now
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </CenteredAuth>
  );
}
