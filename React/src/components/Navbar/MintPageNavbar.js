import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img
} from "@chakra-ui/react"

import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';




export default function MintPageNavbar(props) {


  const {mintForm } = useContext(MintFormContext);

  const { connect, stateUserAddress, signedContract,signer } = useContext(ContractContext);

    const [isOpen, setIsOpen] = useState(false)
   
    const toggle = () => setIsOpen(!isOpen)
   
    return (
<Flex>
  <Box p="2">
    <Heading size="sm">Pool Sharks </Heading>
  </Box>
  <Spacer />
  <Box>

    {stateUserAddress?
    <Button colorScheme="teal" mr="4" >  Logout </Button> 
    
  : <Button colorScheme="teal" onClick={connect}>Log in</Button>
  }
    
    
  </Box>

  {stateUserAddress? <Box>Welcome Back! {stateUserAddress}</Box> : null}

  
</Flex>
    )
  }