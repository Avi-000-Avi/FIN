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
import { id } from "@ethersproject/hash";
import MintFunction from "./MintFunction";
import DexPrice from "./DexPrice";

const Details = (props) => {
  const tokenList = useTokenList(
    "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
  );

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

  const [holdcoinImage, setholdcoinImage] = useState("https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604")
  const [collateralcoinImage, setcollateralcoinImage] = useState("https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880")
  
  useEffect(()=>{

    const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.holdToken}`)
  .then(res => setholdcoinImage(res.data.image.thumb))


  },[mintForm.holdToken])

  useEffect(()=>{

  const grabcollateralCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${mintForm.collateralToken}`)
  .then(res => setcollateralcoinImage(res.data.image.thumb))

  },[ mintForm.collateralToken])



  

  


  return (
    <Box marginLeft={'800px'} paddingTop={'200px'} textColor='#4FD1C5'>
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" > 

    <DexPrice />

      <Text>Set Your Deposit Token</Text>


      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

    
        <GridItem colSpan={2}>
          <Flex spacing={30}>

          <GridItem colSpan={1}>
              <Image src={holdcoinImage}/>
            </GridItem>
            <GridItem colSpan={1}>
              <Select onChange={changeHoldToken}>

              <option value={['0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984','UNI']}>
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

              <option value={['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE','ETH']}>
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
    </Box>
  );
};

export default Details;
