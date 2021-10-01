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
} from "@chakra-ui/react";

import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";

import useTokenList from "../hook/useTokenList";
import { id } from "@ethersproject/hash";
import MintFunction from "./MintFunction";

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

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Mint details</Heading>
      </VStack>
      <Text>Set Your Deposit Token</Text>

      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <Flex spacing={30}>
            <GridItem colSpan={1}>
              <Select onChange={changeHoldToken}>
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
              mr="2rem"
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.amount} />
              <NumberInputStepper>
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
              <Select onChange={changeCollateralToken}>
                {tokenList.map((token, id) => (
                  <option value={[token.address,token.symbol]} key={id}>
                    {token.symbol}
                  </option>
                ))}
              </Select>

              <NumberInput
              onChange={changeStopLoss}
              maxW="50px"
              mr="2rem"
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.stopLoss} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <NumberInput
              onChange={changeTakeProfit}
              maxW="50px"
              mr="2rem"
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.takeProfit} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Checkbox value={mintForm.swapOnMint} onChange={toggleSwapOnMint} >Swap On Mint?</Checkbox>

            </GridItem>
          </Flex>
        </GridItem>

        <GridItem colSpan={2}>
          <MintFunction />
        </GridItem>
        <GridItem></GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Details;
