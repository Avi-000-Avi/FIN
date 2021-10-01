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
    Button,Flex,NumberInput,NumberInputField,NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper,Slider,SliderTrack,SliderThumb,SliderFilledTrack
  } from '@chakra-ui/react';

  import { ContractContext } from "../contexts/ContractContext";
  import { MintFormContext } from "../contexts/MintFormContext";
  
  import useTokenList from "../hook/useTokenList";
import { id } from "@ethersproject/hash";
import MintFunction from "./MintFunction";

  const Details = (props) => {

  const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");
  
  const {connect, stateUserAddress, signedContract} = useContext(ContractContext);
  const {mintForm,changeHoldToken,changeCollateralToken, changeAmount, changeStopLoss, changeTakeProfit } = useContext(MintFormContext);
  
  
  return (
      <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <Heading size="2xl">Mint details</Heading>
        </VStack>
        <Text>Set Your Input Token</Text>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
            <Select onChange={changeHoldToken} >{
            tokenList.map((token,id) =>
            <option value={id} key={id}>{token.symbol}</option>
            )}
            </Select>
          </GridItem>
          <NumberInput maxW="100px" mr="2rem" value={mintForm.amount} onChange={changeAmount}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
          </Flex>
          </GridItem>


          <Text>Set Your Collateral Token</Text>
          
          <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
            <Select onChange={changeCollateralToken}>{
            tokenList.map((token,id) =>
            <option value= {id}key={id}>{token.symbol}</option>
            )}
            </Select>
          </GridItem>
          </Flex>
          </GridItem>
          
        <Button onClick={connect}> Connect </Button>
          <GridItem colSpan={2}>
            <MintFunction/>
          </GridItem>
<GridItem>

</GridItem>

        </SimpleGrid>
      </VStack>

      
    );
  };
  
  export default Details;