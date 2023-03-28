'use client'
// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { DashCurveDown, DashCurveUp } from 'components/icons/Icons';

// Assets
import { MdFaceUnlock, MdDensityMedium, MdMessage, MdDone } from 'react-icons/md';

export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const dashColor = useColorModeValue('brand.500', 'whiteAlpha.500');
	const shadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	const completeShadow = useColorModeValue(
		'0px 18px 40px rgba(112, 144, 176, 0.12)',
		'inset 0px 4px 4px rgba(255, 255, 255, 0.2)'
	);
	const boxBg = useColorModeValue('white', 'linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)');
	return (
		<Card p='30px' w='100%' {...rest}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='10px'>
			See out how simple it is to register.
			</Text>
			<Text color='secondaryGray.600' fontSize='md' fontWeight='400' mb='70px'>
				
			</Text>
			<Flex position='relative' direction={{ base: 'column', md: 'row' }} justifyContent='center'>
				<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdDensityMedium} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
					Complete the form page
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Enter your student ID number.
					</Text>
					
				</Flex>
				<DashCurveUp
					top='60px'
					position='relative'
					color={dashColor}
					w={{ base: '100px', lg: '132px' }}
					display={{ base: 'none', md: 'flex' }}
					h='22px'
				/>
				<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdMessage} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
					Get the text message via SMS
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Use an OTP code to verify your account.
					</Text>
				</Flex>
				<DashCurveDown
				    top='60px' 
					position='relative'
					color={dashColor}
					w={{ base: '100px', lg: '132px' }}
					display={{ base: 'none', md: 'flex' }}
					h='22px'
				/>
				<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdFaceUnlock} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
					Facial Authentication.
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Scan your own face using the smartphone's camera.
					</Text>
				</Flex>
				<DashCurveUp
				    top='60px' 
					position='relative'
					color={dashColor}
					w={{ base: '100px', lg: '132px' }}
					display={{ base: 'none', md: 'flex' }}
					h='22px'
				/>
								<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdDone} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
					Done.
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Use facial authentication to log in.
					</Text>
				</Flex>
			</Flex>
			
		</Card>
	);
}
