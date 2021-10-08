import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img, Image
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

import logo5 from '../../assets/logo5.svg'


import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';
import frame36594 from "../../assets/MintPageForm/frame36594.svg";
import metamask from "../../assets/MintPageForm/metamask.svg";



export default function MintPageNavbar(props) {


  const {mintForm } = useContext(MintFormContext);

  const { connect, stateUserAddress, signedContract,signer } = useContext(ContractContext);

    const [isOpen, setIsOpen] = useState(false)
   
    const toggle = () => setIsOpen(!isOpen)
   
    return (
<Flex backgroundColor='black' textColor='#4FD1C5'>
  <Box p="2">
    <Heading size="sm"> Financially Intelligent NFT </Heading> 
  </Box>

  <Image src={logo5}/>
  <Spacer />


  
  <Spacer />
  {stateUserAddress? <Box margin={2}>Welcome Back! {stateUserAddress}</Box> : <Button colorScheme='' onClick={connect}> <img src={metamask} /></Button>}
  {stateUserAddress? <Button colorScheme='facebook' margin={2}> <Link to="/positions">Positions</Link> </Button>:null }
  {stateUserAddress? <Button colorScheme="facebook" margin={2}> <Link to="/app">Mint</Link> </Button>:null }
  
</Flex>
    )
  }