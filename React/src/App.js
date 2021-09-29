import React, { useEffect, useState, Suspense } from "react";
import web3 from "web3";
import {Container,Flex,VStack,Heading,Text,SimpleGrid,
  GridItem,FormControl,FormLabel,Input,Select,Checkbox
  ,HStack,Image,AspectRatio,Divider,Stack,Button,
  useColorMode,useColorModeValue,Box} from "@chakra-ui/react";

  import { abi } from "./abi/abi";

  import {
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react"

  import {FcCandleSticks} from 'react-icons/fc';

import Details from "./components/Details";

import { useMoralis,ByMoralis,useMoralisWeb3Api , } from "react-moralis";
import { Moralis } from "moralis";

import { ethers, Signer } from "ethers";
const contractAddress = '0xCD8a1C3ba11CF5ECfa6267617243239504a98d90';
const ABI = abi.abi;
const ALCHEMY = "https://eth-mainnet.alchemyapi.io/v2/XLbyCEcaLhQ3x_ZaKBmZqNp8UGgNGX2F"


//const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const provider = new ethers.providers.JsonRpcProvider()
// const provider = ethers.getDefaultProvider("mainnet", { 
//   alchemy: ALCHEMY,
//   });

// const signer = Signer.connect(provider)

const contract = new ethers.Contract(contractAddress, ABI, provider);


//const mint = contract.mint( holdToken, collateralToken, amount, swapOnMint,stopLoss ,takeProfit);
//mint(address holdToken, uint256 amount, uint256 stopLoss, uint256 takeProfit)


const TradingViewComponent = React.lazy(() => import('./components/TradingViewComponent'));


//import IPositionManager from './artifacts/contracts/IPositionManager.sol/IPositionManager.json';
//import PositionManager from './artifacts/contracts/PositionManager.sol/PositionManager.json';

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
  console.log(contract)

  const signer = provider.getSigner();
  const signedContract = contract.connect(signer);
  console.log(signedContract)

  let positions

  const DAIaddress = '0x6b175474e89094c44da98b954eedeac495271d0f'

  const mint = async () =>{
    let mintTx = await signedContract.mint(DAIaddress, 
      DAIaddress,1, false, 1,1,
    {gasPrice: 17677403218, gasLimit: 1000000}
    ).then(res=>console.log(res))

  }
  mint();




 

  //need to grab state from details and share in parent component between details and trading view comp
  //so when form inputs are changed, trading view widget rerenders

  const [pairs, setPairs, reset] = useState('ETHUSDT')

  const changePairs = (e)=>{
    e.preventDefault()
    setPairs(e.target.value)}
  
  

  const [selectedToken, setSelectedToken] = useState();
  const [positionManager,setPositionManager] = useState();
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

<Stack direction="row" spacing={4}>

<Button size="lg" boxShadow="xl" leftIcon={<FcCandleSticks />} colorScheme="gray" variant="solid" onClick={TradingViewComponent}>
  </Button>

  <Button size="lg" boxShadow="xl" onClick={() => logout()}>
            Disconnect Wallet
          </Button>

          <Button size="lg" boxShadow="xl" onClick={ async () => await signedContract.getOwnedPositions()}>
            get positions
          </Button>

          
</Stack>

          <Flex>
        <Heading ml="8" size="md" fontWeight='semibold' color="cyan.400" paddingRight={10}>

          </Heading>
          <Text boxShadow="sm" width="fit-content" height = "fit-content" alignItems="center" p={2} backgroundColor='#6AD5EE'>{user.get("ethAddress")}</Text>
        </Flex>

    <Flex py={10}>
      <Details />

      <Suspense fallback={<div></div>}>
      <TradingViewComponent pairs={pairs}/>
      </Suspense>
      
      
    </Flex>

    <FormControl onChange={changePairs} id="email">
  <FormLabel>Email address</FormLabel>
  <Input type="email" value={pairs}/>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
   
    
  </Container>
  );
}

export default App;
