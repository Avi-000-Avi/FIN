import React, { useEffect, useState } from "react";
import {Container,Flex,VStack,Heading,Text,SimpleGrid,
  GridItem,FormControl,FormLabel,Input,Select,Checkbox
  ,HStack,Image,AspectRatio,Divider,Stack,Button,
  useColorMode,useColorModeValue,} from "@chakra-ui/react";

import Cart from "./components/Cart";
import Details from "./components/Details";
import { useMoralis } from "react-moralis";


function App() {
  const { authenticate, isAuthenticated,isAuthenticating, user , logout } = useMoralis();

  if (!isAuthenticated) {
    return (
      <Container>
        <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Connect Wallet</Button>
       </Container>
    );
  }


  return (
     <Container maxW="container.xl" >
       <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          
          <GridItem colSpan={2}>
            <Button size="lg" onClick={() => logout()}>
              Disconnect Wallet
            </Button>
          </GridItem>
        </SimpleGrid>
       
      { /*<Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
     </Header>*/}
    <Flex py={10}>
      <Details />
      <Cart />
    </Flex>
    
  </Container>
  );
}

export default App;
