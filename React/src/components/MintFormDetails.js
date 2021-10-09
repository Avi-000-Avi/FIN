import React, { useEffect, useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Select,
  FormHelperText,
  Checkbox,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Box,
  Container,
  Image
} from "@chakra-ui/react";
import axios from "axios";


import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";


import useTokenList from "../hook/useTokenList";
import MintFunction from "./MintFunction";
import DexPrice from "./DexPrice";

import {rinkebyList} from "../assets/rinkebyList";
import Transaction from "./Transaction/Transaction";

const MintFormDetails = (props) => {

  const tokenList = rinkebyList
 const rinkebyLinkAddress = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
// const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

  // const tokenList = useTokenList(
  //   "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
  // );

  console.log(tokenList)

  const { connect, stateUserAddress, signedContract } =
    useContext(ContractContext);
  const {
    mintForm,
    changeHoldToken,
    changeCollateralToken,
    changeAmount,
    changeStopLoss,
    changeTakeProfit,
    toggleSwapOnMint,
    tokenSymbols
  } = useContext(MintFormContext);

  const [holdcoinImage, setholdcoinImage] = useState("")
  const [collateralcoinImage, setcollateralcoinImage] = useState("")
  
  useEffect(()=>{

    if(rinkebyList) {

    const tokenSymbol = tokenList.find(token => token.symbol == tokenSymbols.holdToken)
    console.log(tokenSymbol.symbol.toLowerCase(), tokenSymbols.holdToken)

    if(tokenSymbol){
      const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/${tokenSymbol.symbol.toLowerCase()}`)
.then(res => setholdcoinImage(res.data.image.thumb))
    }}else {

    

    const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.holdToken}`)
  .then(res => setholdcoinImage(res.data.image.thumb))
    }



} ,[mintForm.holdToken])

  useEffect(()=>{

    try{
      const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.collateralToken}`)
    .then(res => setholdcoinImage(res.data.image.thumb))}
    catch(error){
      console.log(error)
  
      for(const token of tokenList){
        if (token.symbol == tokenSymbols.collateralToken ){
          const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/${token.symbol}`)
    .then(res => setholdcoinImage(res.data.image.thumb))
        }
      }
  
    }

  if (!collateralcoinImage){
    setcollateralcoinImage("https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880")
  }

  },[ mintForm.collateralToken])




  


  return (
    <Container  p={0} boxShadow="base" backgroundColor="gray.800" borderRadius="10">
    <VStack w="full" h="half" p={10} spacing={10} alignItems="flex-start" > 
      <DexPrice inputToken={mintForm.holdToken}/>

      <Text  fontSize="xl">Set Your Deposit Token</Text>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

    
        <GridItem colSpan={2}>
          <Flex spacing={30}>

          <GridItem colSpan={1}>
              <Image src={holdcoinImage} p ={2}/>
            </GridItem>
            <GridItem colSpan={1}>
              <Select variant='outline'  onChange={changeHoldToken}>

              <option  value={[rinkebyLinkAddress,'LINK']}>
                    {"LINK"}
                  </option>

                {tokenList.map((token, id) => (
                  <option  value={[token.address,token.symbol]} key={id}>
                    {token.symbol}
                  </option>
                ))}
              </Select>
            </GridItem>

            <NumberInput
              onChange={changeAmount}
              maxW="100px"
              paddingLeft='1rem'
              mr="2rem"
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.amount} />
            </NumberInput>
            <MintFunction />
          </Flex>
        </GridItem>

        <Text  fontSize="xl">Set Your Recieve Token</Text>

        <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
          <Image src={collateralcoinImage} p={2}/>
            </GridItem>

            
            

            <GridItem colSpan={1}>
              <Select className={'selectText'} onChange={changeCollateralToken}>

              <option className={'selectText'} value={["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",'ETH']}>
                    {"ETH"}
                  </option>


                {tokenList.map((token, id) => (
                  <option className={'selectText'} value={[token.address,token.symbol]} key={id}>
                    {token.symbol}
                  </option>
                ))}
           
              </Select>

              </GridItem>

              

            <Text p={2}>Max Price</Text>

            <NumberInput
              onChange={changeTakeProfit}
              maxW="100px"
              
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.takeProfit} />
            </NumberInput>

            <Text  fontSize="1xl" p ={2}>Min Price</Text>

<NumberInput
onChange={changeStopLoss}
maxW="100px"
defaultValue={0}
min={0}
>
<NumberInputField value={mintForm.stopLoss} />
</NumberInput>




            
          </Flex>
        </GridItem>

      </SimpleGrid>
      <Flex>

      </Flex>
    </VStack>
    </Container>
  );
};

export default MintFormDetails;
