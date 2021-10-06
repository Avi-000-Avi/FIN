import React,{useState, useContext} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';


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
    <Heading size="sm"> Financially Intelligent NFT</Heading>
  </Box>


  <Spacer />


  {stateUserAddress? <Box>Welcome Back! {stateUserAddress}</Box> : <Button onClick={connect}> <img src={frame36594} /></Button>}
  {stateUserAddress? <Button colorScheme="blue"> <Link to="/positions">Positions</Link> </Button>:null }
  {stateUserAddress? <Button colorScheme="blue"> <Link to="/app">Mint</Link> </Button>:null }
  
</Flex>
    )
  }