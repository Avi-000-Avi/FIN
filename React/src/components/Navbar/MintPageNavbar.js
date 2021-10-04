import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img
} from "@chakra-ui/react"

import "./MintPage.css";

import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';
import frame36594 from "../../assets/MintPageForm/frame36594.svg";



export default function MintPageNavbar(props) {


  const {mintForm } = useContext(MintFormContext);

  const { connect, stateUserAddress, signedContract,signer } = useContext(ContractContext);

    const [isOpen, setIsOpen] = useState(false)
   
    const toggle = () => setIsOpen(!isOpen)
   
    return (
<Flex textColor='#4FD1C5'>
  <Box p="2">
    <Heading size="sm"> Financially Intelligent Token</Heading>
  </Box>
  <Spacer />
  <Box>

    {stateUserAddress?
    <Button colorScheme="teal" mr="4" >  Logout </Button> 
    
  : <Button onClick={connect}> <img src={frame36594} /></Button>
  }
    
    
  </Box>

  {stateUserAddress? <Box>Welcome Back! {stateUserAddress}</Box> : null}

  
</Flex>
    )
  }