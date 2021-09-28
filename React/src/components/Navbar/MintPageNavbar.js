import React,{useState} from 'react'
import {Flex, Box, Spacer, Button, Heading, Img
} from "@chakra-ui/react"

import { useMoralis } from "react-moralis"


export default function MintPageNavbar(props) {

  const {authenticate, logout,isInitialized, isAuthenticated,authError, hasAuthError,user, enableWeb3,isAuthenticating, isWeb3Enabled, Moralis, web3} = useMoralis()

    const [isOpen, setIsOpen] = useState(false)
   
    const toggle = () => setIsOpen(!isOpen)
   
    return (
<Flex>
  <Box p="2">
    <Heading size="sm"><Img src='./PoolSharks.svg' /></Heading>
  </Box>
  <Spacer />
  <Box>

    {isAuthenticated?
    <Button colorScheme="teal" mr="4" onClick={ async ()=>logout()}>
    Logout 
  </Button> : <Button colorScheme="teal" onClick={async ()=>authenticate()}>Log in</Button>
  }
    
    
  </Box>

  {isAuthenticated? <Box>Welcome {user.get('ethAddress')}</Box> : null}

  
</Flex>
    )
  }