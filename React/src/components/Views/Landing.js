import React from 'react'
import useWindowSize from '../../hook/useWindowSize';
import landing from "../../assets/landing.jpg";
import { Image } from '@chakra-ui/image';
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from "@chakra-ui/react"
import cylinder from "../../assets/cylinder.png";
import viewDemoButton from "../../assets/viewDemoButton.svg";
import joinDiscordButton from "../../assets/joinDiscordButton.svg";



export default function Landing() {

   // const size = useWindowSize();

        return(


<Container maxW='2100px' maxH='500px' centerContent>
           <Image maxW='1550px' maxH='900px' src={landing}/>
           <Button marginBottom={6} bottom={'450px'} right={'500px'} colorScheme=""> <a href='/app'>  <Image src={viewDemoButton}></Image> </a>  </Button>
           
            </Container>
            
      
        )
            
}
