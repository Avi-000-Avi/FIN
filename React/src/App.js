import React, { useEffect, useState } from "react";
import {Container,Flex,VStack,Heading,Text,SimpleGrid,
  GridItem,FormControl,FormLabel,Input,Select,Checkbox
  ,HStack,Image,AspectRatio,Divider,Stack,Button,
  useColorMode,useColorModeValue,Box} from "@chakra-ui/react";

import Chart from "./components/Chart";
import Details from "./components/Details";
import { useMoralis,ByMoralis,useMoralisWeb3Api , } from "react-moralis";
import { Moralis } from "moralis";

import { ethers } from "ethers";

import IPositionManager from './artifacts/contracts/IPositionManager.sol/IPositionManager.json';
import PositionManager from './artifacts/contracts/PositionManager.sol/PositionManager.json';

const address = "0x03F06b2f2E7AaE545Ecd266F591407B1bA733037";

const appId = "ZPm0AMIy2nn0lSdNgDLg6g7tVRP6F7gK2t9L6V6f";
const serverUrl = "https://ddnwackqf7dj.moralishost.com:2053/server";


Moralis.initialize(appId);
Moralis.serverURL = serverUrl;

//ToDO
//0x12aADAdd301d22c941DACF2cfa7A9e2019972F61 -> Changes to 0x12aadadd301d22c941dacf2cfa7a9e2019972f61
//Fix that so that will be able to query using Moralis

//Utility Function for that
//After selecting a particular token from the token list 
//Check if that token exists by checking the balance array which we have filled up using Moralis
//Check if it exists in it

//Utitlity function for Converting balances into viewable numbers


//Chart - Probably using React-stockcharts
//After getting the selectToken
//Use it to make the chart for that particular token by fetching the prices from some api


function App() {
  const [selectedToken, setSelectedToken] = useState();
  const [positionManager,setPositionManager] = useState(PositionManager);
  const [loggedInAddress,setLoggedInAddress] = useState();
  const [allTokenBalances,setAllTokenBalances] = useState();
  
  const { authenticate,isInitialized, isAuthenticated,isAuthenticating ,user, logout } = useMoralis();  

  const getBalance = async () => {
    const options = {
      chain: "ropsten",
      address: "0x12aADAdd301d22c941DACF2cfa7A9e2019972F61"
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options);
    console.log("all token balances of a current user", balances);
    setAllTokenBalances(balances);
  };
  
  useEffect(() => {
    if(isAuthenticated)
    {
      console.log(user.get("ethAddress"));
      setLoggedInAddress(user.get("ethAddress"));
    }
  },[isAuthenticated]);

  useEffect(() => {
    if(loggedInAddress)
    {
      getBalance();
    }
  },[loggedInAddress]);

  if (!isAuthenticated) {
    return (
      <Container maxW="container.xl" p ={5}>
        <Heading ml="8" size="md" fontWeight='semibold' color="cyan.400" alig>
            <Button boxShadow="xl" isLoading={isAuthenticating} onClick={() => authenticate().then(user => {console.log(user)})}>Connect Wallet</Button>
        </Heading>
        <Text></Text>
        
       </Container>
    );
  }

  return (
     <Container maxW="container.xl" p ={5}>

          <Flex>
        <Heading ml="8" size="md" fontWeight='semibold' color="cyan.400" paddingRight={10}>
        <Button size="lg" boxShadow="xl" onClick={() => logout()}>
            Disconnect Wallet
          </Button>
          </Heading>
          <Text boxShadow="sm" width="fit-content" height = "fit-content" alignItems="center" p={2} backgroundColor='#6AD5EE'>{user.get("ethAddress")}</Text>
        </Flex>

    <Flex py={10}>
      <Details />
      <Chart />
    </Flex>

    
  </Container>
  );
}

export default App;
