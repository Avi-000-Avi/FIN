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

  // const tokenList = rinkebyList
  // const rinkebyLinkAddress = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
 const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

  const tokenList = useTokenList(
    "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
  );

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
    toggleSwapOnMint
  } = useContext(MintFormContext);

  const [holdcoinImage, setholdcoinImage] = useState("")
  const [collateralcoinImage, setcollateralcoinImage] = useState("")
  
  useEffect(()=>{

    const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.holdToken}`)
  .then(res => setholdcoinImage(res.data.image.thumb))


  },[mintForm.holdToken])

  useEffect(()=>{

  const grabcollateralCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.collateralToken}`)
  .then(res => setcollateralcoinImage(res.data.image.thumb))

  if (!collateralcoinImage){
    setcollateralcoinImage("https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880")
  }

  },[ mintForm.collateralToken])




  


  return (
    <Box marginLeft={'800px'} paddingTop={'200px'} textColor='#4FD1C5'>
      {stateUserAddress? 
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" > 

      <DexPrice inputToken={mintForm.holdToken}/>

      <Text>Set Your Deposit Token</Text>
     


      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

    
        <GridItem colSpan={2}>
          <Flex spacing={30}>

          <GridItem colSpan={1}>
              <Image src={holdcoinImage}/>
            </GridItem>
            <GridItem colSpan={1}>
              <Select onChange={changeHoldToken}>

              <option value={[uniAddress,'UNI']}>
                    {"UNI"}
                  </option>

                {tokenList.map((token, id) => (
                  <option value={[token.address,token.symbol]} key={id}>
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
              <NumberInputStepper >
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </GridItem>

        <Text>Set Your Recieve Token</Text>

        <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
          <Image src={collateralcoinImage}/>
            </GridItem>

            
            

            <GridItem colSpan={1}>
              <Select onChange={changeCollateralToken}>

              <option value={["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",'ETH']}>
                    {"ETH"}
                  </option>


                {tokenList.map((token, id) => (
                  <option value={[token.address,token.symbol]} key={id}>
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
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Text p={2}>Min Price</Text>

<NumberInput
onChange={changeStopLoss}
maxW="100px"
defaultValue={0}
min={0}
>
<NumberInputField value={mintForm.stopLoss} />
<NumberInputStepper >
  <NumberIncrementStepper />
  <NumberDecrementStepper />
</NumberInputStepper>
</NumberInput>




            
          </Flex>
        </GridItem>

        <GridItem colSpan={2}>
          <MintFunction />
        </GridItem>
        <GridItem></GridItem>
      </SimpleGrid>
    </VStack>
    : null}
    </Box>
  );
};

export default MintFormDetails;