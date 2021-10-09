import React from 'react'
import useWindowSize from '../../hook/useWindowSize';
import landing from "../../assets/landing.jpg";
import { Container, VStack,Text,Button,Flex ,Heading,Box,Image} from '@chakra-ui/react';
 import {Link} from "react-router-dom";
import enterAppButton from '../../assets/enterAppButton.svg'
import cylinder from "../../assets/cylinder.svg";
import tokenSVG from "../../assets/tokenSVG.png";
import landingPageLines from "../../assets/landingPageLines.svg";
import PoolShark from "../../assets/PoolShark.svg";
import pipe from "../../assets/1.png";
import pipe2 from "../../assets/2.png";
import pipe3 from "../../assets/3.png";
import countdown from "../../assets/4.png";
import pipe4 from "../../assets/5.png";
import logo5 from "../../assets/logo5.svg";
import brandLogo from "../../assets/brandLogo.png";
import cell from "../../assets/cell.png";


export default function Landing() {

   const size = useWindowSize();

        return(
            <VStack maxW='2100px'   backgroundColor='#010100'>
         <Image src ={brandLogo}   pos="absolute" top ="50px" paddingRight="1600px"/>

           <VStack paddingBottom="600px">
           <Image src ={landingPageLines} top ="600"  pos="absolute"/>
            <Image src ={tokenSVG} zIndex="1" paddingLeft="1200px"/>
            
            <Box align='flex-end' top ="180" zIndex="2" pos="absolute">
            <Image src ={PoolShark} alignSelf="left" paddingRight="1200px"/>
            <Text fontSize="2xl" paddingBottom="50px">Take a bite out of Smart Contract Automation</Text>
            <Link to="/app">
            <Button  backgroundColor="white" borderRadius="5"	color="black" p="5"> View Demo</Button>
            </Link>
            </Box>
            <Image src ={cylinder} zIndex="3" top ="150" pos="absolute"/>
            </VStack>
            <VStack paddingBottom="400px">
            <Image src ={pipe} zIndex="1"  top="1200px" pos="absolute"/>

           <Text fontSize="6xl" paddingBottom="50px">Welcome to DEFI 3.0 Smart Contract Automation</Text>
           
           <Text fontSize="30px" paddingRight="470px" >Time to level the playing field for Decentralized<br/> 
           Fees from the protocol will be<br/>
           converted to $LINK and $GRT.$FIN<br/>
           token holders can claim this by <br/>
           burning their $FIN.<br/>
           </Text>
              
               </VStack>
               <VStack>

           <Image src ={pipe2} />
              
           <Image src ={pipe3} />
           <Image src ={countdown} />
           <Image src ={pipe4} />
           <Image src ={cell} paddingBottom="100px"/>

           </VStack>
           
           </VStack>
        );
            
}
