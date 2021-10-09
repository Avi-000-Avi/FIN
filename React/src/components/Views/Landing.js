import React from 'react'
import useWindowSize from '../../hook/useWindowSize';
import landing from "../../assets/landing.jpg";
import { Image } from '@chakra-ui/image';
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from "@chakra-ui/react"
import enterAppButton from '../../assets/enterAppButton.svg'
import cylinder from "../../assets/cylinder.png";



export default function Landing() {

   // const size = useWindowSize();

        return(
            <VStack maxW='2100px'  centerContent backgroundColor='#595959'>
            <Image src ={cylinder}/>
           <Button bottom={'450px'} right={'500px'} backgroundColor="white" borderRadius="10"	> <a href='/app'> Enter App</a>  </Button>
           </VStack>
        )
            
}
