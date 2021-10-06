import React from 'react'
import useWindowSize from '../../hook/useWindowSize';
import landing from "../../assets/landing.jpg";
import { Image } from '@chakra-ui/image';
import { Container } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from "@chakra-ui/react"



export default function Landing() {

   // const size = useWindowSize();

        return(
            <Container maxW='container.xxl' centerContent>
           <Image width={'100%'} height={'100%'}src={landing}/>
           
           


           <Button bottom={'450px'} right={'500px'} colorScheme="blue"> <Link href="/app">Enter App</Link> </Button>
           </Container>
        )
            
}
