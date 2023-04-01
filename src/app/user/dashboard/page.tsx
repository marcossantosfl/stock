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
  Select,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Badge,
  Stack,
} from '@chakra-ui/react';
// Custom components
import React, { useEffect, useState } from 'react';
import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page';
import { MdAddShoppingCart, MdClose, MdEditSquare } from 'react-icons/md';
import Card from 'components/card/Card';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEthereum } from 'react-icons/fa';

export default function DashBoard() {
  const router = useRouter();
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButtons1, setIsLoadingButtons1] = useState([]);
  const [isLoadingButtons2, setIsLoadingButtons2] = useState([]);
  const [isBlockButtons, setIsBlockButtons] = useState(false);
  const [isLoadingMarkAsDelivered, setIsLoadingMarkAsDelivered] = useState(false);
  const [isCartProcess, setCartProcess] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [bill, setBill] = useState(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const redIcon = useColorModeValue('red.500', 'white');
  const yellowIcon = useColorModeValue('yellow.500', 'white');
  const greenIcon = useColorModeValue('green.500', 'white');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = Array.from({ length: 100 }, (_, i) => `${i + 1}`);
  const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
  const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
  const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
  const userId = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('userId')) : null;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const headers = {
        "x-access-token": token,
        "Accept": "application/json",
      };
      const response = await axios.get(`https://api-stock-23gsh.ondigitalocean.app/api/auth/cart/${userId}`, { headers });

      if (response.data.error === 'Cart not found') {
        setCart([])
      } else {
        //alert(JSON.stringify(response.data))
        setCart(response.data.cartItems);
      }
    } catch (error) {
      console.log(JSON.stringify(error))
      console.log(error);
    }
  };

  // Load the cart data from the API when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    setSelectedOptions(Array.from({ length: stocks.length }, () => '1'));
  }, [stocks.length]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      if (token == null) {
        localStorage.clear();
        router.push('/home');
      }

      fetch(`https://api-stock-23gsh.ondigitalocean.app/api/auth/stocks/${userId}`, {
        headers: {
          "Accept": 'application/json',
          "x-access-token": token
        }
      })
        .then(res => res.json())
        .then(data => {
          setStocks(data.stocks);
        })
        .catch(err => {
          console.error(err);
        });
    }, 2000);
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      const fetchBill = async () => {
        try {
          const headers = {
            "x-access-token": token,
            "Accept": 'application/json',
          };
          const response = await axios.get(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}`, { headers });
          setBill(response.data.bill);
          if (response.data.bill.end) {
            //router.push('/user/end-bill'); // Replace '/thank-you-page' with the path to your desired page
          }
          //end of the bill
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchBill();
    }, 2000);
  }, [isLoadingMarkAsDelivered]);

  const handleCloseCart = async () => {

    if (isCartProcess) {
      return;
    }

    setIsLoadingMarkAsDelivered(true);
    setCartProcess(true);

    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/cart/${userId}/close`, {}, { headers });
      if (response.data.message === 'Cart closed successfully') {
        // Do something after the bill has been marked as delivered
        setTimeout(() => {
          setIsLoadingMarkAsDelivered(false);
          setCart([])
          setCartProcess(false);
        }, 300);

      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingMarkAsDelivered(false);
        setCartProcess(false);
      }, 300);
    }
  };

  const handleEndDay = async () => {

    if (isLoadingReset) {
      return;
    }

    setIsLoadingReset(true);
    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/bill/${userId}/close`, { action: "close" }, { headers });
      if (response.data.message === 'Bill closed') {
        // Do something after the bill has been marked as delivered
        setTimeout(() => {
          router.push('/user/end-bill');
          //setIsLoadingReset(false);
        }, 1000);

      }
    } catch (error) {
      console.error(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingReset(false);
      }, 1000);
    }
  };


  const handleCartCreate = async (index) => {
    if (isLoadingButtons1[index]) {
      // Stock is already being updated or a long press is in progress, do nothing
      return;
    }

    setIsLoadingButtons1(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    setIsBlockButtons(true);

    try {
      const stock = stocks[index];
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };

      const data = {
        quantity: selectedOptions[index],
        stockId: stock.id,
      };

      const existingCartItem = cart.find(item => item.stockId === stock.id);
      if (existingCartItem) {
        await handleUpdate(existingCartItem, parseInt(data.quantity), index);
        return;
      }


      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/cart/${userId}/create`, data, { headers });
      if (response.data.message === 'Cart created successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 100)),
          new Promise<void>(resolve => setTimeout(() => {
            setIsLoadingButtons1(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });

            setSelectedOptions(prev => {
              const copy = [...prev];
              copy[index] = '1';
              return copy;
            });

            // ...       

            const cartItems = {
              cartId: response.data.cartId,
              stockId: stock.id,
              quantity: parseInt(data.quantity),
              price: stock.value,
              stockName: stock.name,
            };

            setCart([...cart, cartItems]);

            // Update the stock quantity
            stock.amount -= data.quantity;

            // Update the stock quantity
            setStocks(prevStocks => {
              const updatedStocks = prevStocks.map(stock => {
                if (stock.id === stock.id) {
                  return {
                    ...stock,
                    quantity: parseInt(stock.quantity) - parseInt(selectedOptions[index]),
                  };
                }
                return stock;
              });

              return updatedStocks;
            });

            // ...

            setIsBlockButtons(false);

            resolve();
          }, 100))
        ]);


        //setMarkAsDelivered(true);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingButtons1(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
        setIsBlockButtons(false);
      }, 100);
    }
  };

  const handleDeleteCartItem = async (index) => {
    if (isLoadingButtons2[index]) {
      // Cart item is already being deleted, do nothing
      return;
    }

    setIsBlockButtons(true);

    setIsLoadingButtons2(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    try {
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };

      const cartItem = cart[index];

      if (!cartItem) {
        alert("Cart item not found");
        return;
      }

      const data = {
        cartItemId: cartItem.stockId,
      };

      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/cart/${userId}/delete`, data, { headers });

      if (response.data.message === 'Cart item deleted successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 300)),
          new Promise<void>(resolve => setTimeout(() => {
            setIsLoadingButtons2(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });


            const stock = stocks.find((item) => item.id === cartItem.stockId);

            // Update the stock amount
            stock.amount = response.data.amount;


            // Update the Cart state
            setCart(prevCart => {
              const updatedCart = prevCart.filter(item => item.stockId !== data.cartItemId);

              return updatedCart;
            });

            setIsBlockButtons(false);

            resolve();
          }, 300))
        ]);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingButtons2(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
        setIsBlockButtons(false);
      }, 300);
    }
  };

  const handleUpdate = async (cartItem, quantity, index) => {
    if (isLoadingButtons1[index]) {
      // Stock is already being updated or a long press is in progress, do nothing
      return;
    }

    setIsLoadingButtons1(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });


    setIsBlockButtons(true);

    try {
      const stock = stocks.find(item => item.id === cartItem.stockId);
      const headers = {
        "x-access-token": token,
        "Accept": 'application/json',
      };
      const data = {
        quantity: quantity,
        cartItemId: stock.id,
      };

      const response = await axios.post(`https://api-stock-23gsh.ondigitalocean.app/api/auth/cart/${userId}/update`, data, { headers });
      if (response.data.message === 'Cart item updated successfully') {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 300)),
          new Promise<void>(resolve => setTimeout(() => {
            setIsLoadingButtons1(prev => {
              const copy = [...prev];
              copy[index] = false;
              return copy;
            });

            setSelectedOptions(prev => {
              const copy = [...prev];
              copy[index] = '1';
              return copy;
            });

            // Update the stock quantity
            stock.amount -= data.quantity;

            // Update the Cart state
            setCart(prevCart => {
              const updatedCart = prevCart.map(item => {
                if (item.stockId === stock.id) {
                  return {
                    ...item,
                    quantity: Number(item.quantity) + Number(data.quantity),
                  };
                }
                return item;
              });
              return updatedCart;
            });


            setIsBlockButtons(false);
            // ...

            resolve();
          }, 300))
        ]);


        setIsLoadingButtons1(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });

        //setMarkAsDelivered(true);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setTimeout(() => {
        setIsLoadingButtons1(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
      }, 300);
    }
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * parseInt(item.quantity);
    });
    return totalPrice;
  };


  const handleOptionChange = (index, value) => {
    setSelectedOptions(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
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
            align="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center" justifySelf="center"
          >
            <Card p="30px"  >
              <Flex direction="column" w="100%" justifyContent="center" alignItems="center">

                <Stack direction="column" spacing="10px" align="center" justifyContent="center" alignItems="center">

                  <Badge mt="4px" ml="1" fontSize="md"  colorScheme="green">
                    {`Ganhos  €${bill.earn}`}
                  </Badge>

                  <Badge mt="4px" ml="1" fontSize="md"  colorScheme="blue">
                    {`A Pagar  €${bill.toPay}`}
                  </Badge>

                  <Badge mt="4px" ml="1" fontSize="md"  colorScheme="yellow">
                    {`Sistema  €${bill.toPayTotal.toFixed(2)}`}
                  </Badge>
                </Stack>

                <Text mt="30px" fontSize="xl" fontWeight="bold">
                  Total no carrinho:
                  <Badge ml="1" fontSize="md" colorScheme="green">
                    €{calculateTotalPrice(cart)}
                  </Badge>
                </Text>

              </Flex>
              {Array.isArray(stocks) &&
                stocks.map((stock, index) => (

                  <SimpleGrid key={index} columns={3} gap="10px" mt="30px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">

                    <Flex direction='column' justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                      <Text color={textColor} fontSize='md' me='6px' fontWeight='700'>
                        {stock.name}
                      </Text>
                      <Badge ml="1" fontSize="sm" colorScheme="green">
                        Qt: {stock.amount}
                      </Badge>
                      <Badge mt="4px" ml="1" fontSize="sm" colorScheme="purple">
                        Valor: €{stock.value}
                      </Badge>
                    </Flex>


                    <Flex
                      direction="column"
                      align="center"
                      alignContent="center"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                      justifyItems="center"
                      w="100%"
                    >

                      <Select
                        isDisabled={stock.amount <= 0}
                        ml="10px"
                        fontSize="sm"
                        id="quantity"
                        variant="main"
                        h="44px"
                        maxH="44px"
                        fontWeight="400"
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        value={selectedOptions[index]}
                      >
                        {Array.from({ length: stock.amount }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Select>
                    </Flex>


                    <Flex ml="20px" direction='column' align='center'>
                      <IconButton
                        isDisabled={stock.amount <= 0 || isLoadingButtons1[index] || isBlockButtons}
                        isLoading={isLoadingButtons1[index]}
                        aria-label='transfer'
                        borderRadius='50%'
                        bg={bgIconButton}
                        _hover={bgIconHover}
                        _active={bgIconFocus}
                        _focus={bgIconFocus}
                        w='56px'
                        h='56px'
                        mb='5px'
                        boxShadow={shadow}
                        onClick={(e) => handleCartCreate(index)}
                        icon={<Icon as={MdAddShoppingCart} color={stock.amount <= 0 ? redIcon : greenIcon} w='24px' h='24px' />} />
                      <Text fontSize='sm' fontWeight='500' color={textColor}>
                        {stock.amount == 0 ? 'Zerado' : 'Adicionar'}
                      </Text>
                    </Flex>
                  </SimpleGrid>


                ))}

              <SimpleGrid columns={3} gap="10px" mt="30px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                <Flex direction='column' align='center'>
                  <IconButton
                    //isLoading={isLoadingReset || isLoadingMarkAsDelivered}
                    isDisabled={isLoadingReset || isLoadingMarkAsDelivered || isBlockButtons}
                    aria-label='transfer'
                    borderRadius='50%'
                    bg={bgIconButton}
                    _hover={bgIconHover}
                    _active={bgIconFocus}
                    _focus={bgIconFocus}
                    w='56px'
                    h='56px'
                    mb='5px'
                    boxShadow={shadow}
                    icon={<Icon as={MdEditSquare} color={iconColor} w='24px' h='24px' />}
                  />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Alterar
                  </Text>
                </Flex>
                <Flex direction='column' align='center'>
                  <IconButton
                    //isLoading={isLoadingReset || isLoadingMarkAsDelivered}
                    isDisabled={isLoadingReset || isLoadingMarkAsDelivered || isBlockButtons}
                    onClick={() => handleEndDay()}
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
                    icon={<Icon as={MdClose} color={redIcon} w='24px' h='24px' />}
                  />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Fechar
                  </Text>
                </Flex>
                <Flex direction='column' align='center'>
                  <IconButton
                    //isLoading={isLoadingReset || isLoadingMarkAsDelivered}
                    isDisabled={isLoadingReset || isLoadingMarkAsDelivered || !cart || cart.length === 0 || isBlockButtons}
                    onClick={onOpen}
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
                    icon={<Icon as={MdAddShoppingCart} color={yellowIcon} w='24px' h='24px' />}
                  />
                  <Text fontSize='sm' fontWeight='500' color={textColor}>
                    Carrinho
                  </Text>
                </Flex>
              </SimpleGrid>
            </Card>

            <>
              <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}
                isCentered
                motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Carrinho</ModalHeader>
                  <ModalCloseButton />
                  <Flex hidden={cart.length > 0} direction="column" w="100%">
                    <Stack direction="column" mb="10px" spacing="10px" align="center" color={greenIcon} justifyContent="center" alignItems="center">
                      <Text align="center" fontWeight="bold">
                        Pedido entregue com sucesso.
                      </Text>
                    </Stack>
                    <Stack direction="column" spacing="10px" align="center" justifyContent="center" alignItems="center">
                      <Text align="center" fontWeight="bold">
                        Carrinho vazio
                      </Text>
                    </Stack>
                  </Flex>
                  <ModalBody pb={6}>
                    {Array.isArray(cart) && cart.map((cartItem, index) => (
                      <Flex key={index} justifyContent="center" alignItems="center" w="100%">
                        <Flex direction="column" align="center" me="auto" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                          <Badge mt="4px" ml="1" fontSize="0.8em" colorScheme="blue">
                            {cartItem.stockName}
                          </Badge>
                        </Flex>
           
                          <Select
                            mr="10px"
                            isDisabled={cartItem.amount <= 0}
                            fontSize="sm"
                            id="quantity"
                            variant="main"
                            w="100%"
                            h="44px"
                            maxH="44px"
                            maxW="80px"
                            fontWeight="400"
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            value={cartItem.quantity}
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
          
                        <Flex mt="10px" direction='column' align='center'>
                          <IconButton
                            aria-label='transfer'
                            borderRadius='50%'
                            bg={bgIconButton}
                            _hover={bgIconHover}
                            _active={bgIconFocus}
                            _focus={bgIconFocus}
                            w='56px'
                            h='56px'
                            mb='5px'
                            boxShadow={shadow}
                            //onClick={(e) => handleStockUpdate2(index, 'update')}
                            icon={<Icon as={MdEditSquare} color={yellowIcon} w='24px' h='24px' />} />
                          <Text fontSize='sm' fontWeight='500' color={textColor}>
                            Alterar
                          </Text>
                        </Flex>

                        <Flex mt="10px" ml="20px" direction='column' align='center'>
                          <IconButton
                            isLoading={isLoadingButtons2[index]}
                            aria-label='transfer'
                            borderRadius='50%'
                            bg={bgIconButton}
                            _hover={bgIconHover}
                            _active={bgIconFocus}
                            _focus={bgIconFocus}
                            w='56px'
                            h='56px'
                            mb='5px'
                            boxShadow={shadow}
                            onClick={(e) => handleDeleteCartItem(index)}
                            icon={<Icon as={MdClose} color={redIcon} w='24px' h='24px' />} />
                          <Text fontSize='sm' fontWeight='500' color={textColor}>
                            Deletar
                          </Text>
                        </Flex>


                      </Flex>
                    ))}
                    <Flex hidden={cart.length === 0} mt="20px" gap="10px" direction='row' align='center' justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                      <Text fontSize="xl" fontWeight="bold">
                        Total:
                        <Badge ml="1" fontSize="0.8em" colorScheme="green">
                          €{calculateTotalPrice(cart)}
                        </Badge>
                      </Text>
                      <SimpleGrid row={1} mr="40px" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center" textAlign="center">
                        <Select
                          fontSize="sm"
                          id="quantity"
                          variant="main"
                          h="44px"
                          maxH="44px"
                          maxW="100px"
                          fontWeight="400"
                          value={calculateTotalPrice(cart)}
                        >
                          {Array.from({ length: 150 }, (_, i) => (i + 1) * 10)
                            .filter((price) => price <= 1500)
                            .map((price) => (
                              <option key={price} value={price}>
                                {price}
                              </option>
                            ))}
                        </Select>

                      </SimpleGrid>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={(e) => handleCloseCart()}
                      isLoading={isCartProcess}
                      isDisabled={cart.length === 0 || isCartProcess} colorScheme="green" mr={3}>
                      Entregar
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>Fechar</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </Flex>
        </CenteredAuth >
      )
      }
    </>
  );
}