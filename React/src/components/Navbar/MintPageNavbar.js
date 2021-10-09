import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img, Image
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

import logo5 from '../../assets/logo5.svg'


import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';
import wallet from "../../assets/wallet.png";

import { Text} from "@chakra-ui/react";

export default function MintPageNavbar(props) {


  const {mintForm } = useContext(MintFormContext);

  const { connect, stateUserAddress, signedContract,signer } = useContext(ContractContext);

    const [isOpen, setIsOpen] = useState(false)
   
    const toggle = () => setIsOpen(!isOpen)
   
    return (
      
<Flex  p={5}>
  <Flex margin={2} spacing={10}>
  <Image src={logo5} />
  <Heading size="m" >Financially Intelligent NFTs</Heading> 
  </Flex>

  <Spacer />

  <Spacer />
  {stateUserAddress? <Button margin={2}
  colorScheme="teal" margin={2} boxShadow="base" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }}
  >Connected! <img src={wallet} style={{width:"25px",hieght:"25px",paddingLeft:"2px"}}/></Button> : <Button onClick={connect} margin={2}
  colorScheme="teal" margin={2} boxShadow="base" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }}
  >Connect With Wallet<img src={wallet} style={{width:"25px",hieght:"25px",paddingLeft:"2px"}}/></Button>}
  <Button colorScheme='teal' margin={2} boxShadow="base" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }} > <Link to="/positions">Positions</Link> </Button>
  <Button colorScheme="teal" margin={2} boxShadow="base" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }} > <Link to="/app">Mint</Link> </Button>
  
</Flex>
    )
  }