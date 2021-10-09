import React from 'react'
import useWindowSize from '../../hook/useWindowSize';
import landing from "../../assets/landing.jpg";
import { Image } from '@chakra-ui/image';
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from "@chakra-ui/react"
<<<<<<< HEAD
import cylinder from "../../assets/cylinder.png";
import viewDemoButton from "../../assets/viewDemoButton.svg";
import joinDiscordButton from "../../assets/joinDiscordButton.svg";
=======
import enterAppButton from '../../assets/enterAppButton.svg'
import cylinder from "../../assets/cylinder.svg";
>>>>>>> 693cfb92026f5883e96e381a07a77e1a2084f092



export default function Landing() {

   // const size = useWindowSize();

        return(
<<<<<<< HEAD


<Container maxW='2100px' maxH='500px' centerContent>
           <Image maxW='1550px' maxH='900px' src={landing}/>
           <Button marginBottom={2} bottom={'450px'} right={'500px'} colorScheme=""> <a href='/app'>  <Image src={viewDemoButton}></Image> </a>  </Button>
           <Button bottom={'450px'} right={'500px'} colorScheme=""> <a href='/app'>  <Image src={joinDiscordButton}></Image> </a>  </Button>
            </Container>
            
      
=======
            <VStack maxW='2100px'  centerContent backgroundColor='#595959'>
            <Image src ={cylinder} h="75%" w=""/>
           <Button bottom={'450px'} right={'500px'} backgroundColor="white" borderRadius="10"	color="black"> <a href='/app'> Enter App</a>  </Button>
           </VStack>
>>>>>>> 693cfb92026f5883e96e381a07a77e1a2084f092
        )
            
}
