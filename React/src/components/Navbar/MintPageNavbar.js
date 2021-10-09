import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img, Image
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

import logo5 from '../../assets/logo5.svg'


import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';
import frame36594 from "../../assets/MintPageForm/frame36594.svg";
import metamask from "../../assets/MintPageForm/metamask.svg";

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
  <Heading size="md" > FINs </Heading> 
  </Flex>

  <Spacer />

  <Spacer />
  {stateUserAddress? <Text p={2} >Welcome Back! {stateUserAddress}</Text> : <Button onClick={connect} margin={2}
  colorScheme="teal" margin={2} boxShadow="base" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }}
  >Connect With Wallet<img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-wallet-man-accessories-kiranshastry-lineal-kiranshastry.png" style={{width:"25px",hieght:"25px",paddingLeft:"2px"}}/></Button>}
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