import React, { useEffect, useState } from "react";

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
    Checkbox,
    Button,Flex,NumberInput,NumberInputField,NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper,Slider,SliderTrack,SliderThumb,SliderFilledTrack
  } from '@chakra-ui/react';
  
  import useTokenList from "../hook/useTokenList";
import { id } from "@ethersproject/hash";

  const Details = () => {

  const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");
  console.log(tokenList);
  
  const [input, setInput] = useState(0)
  const [collateral, setCollateral] = useState(0)

  const handleInputChange = (input) => setInput(input)
  const handleCollateralChange = (collateral) => setCollateral(collateral)
  
  
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
            <Select>{
            tokenList.map((token,id) =>
            <option key={id}>{token.symbol}</option>
            )}
            </Select>
          </GridItem>
          <NumberInput maxW="100px" mr="2rem" value={input} onChange={handleInputChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider flex="1" focusThumbOnChange={false} value={input} onChange={handleInputChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={input} />
      </Slider>
          </Flex>
          </GridItem>


          <Text>Set Your Collateral Token</Text>
          
          <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
            <Select>{
            tokenList.map((token,id) =>
            <option key={id}>{token.symbol}</option>
            )}
            </Select>
          </GridItem>
          <NumberInput maxW="100px" mr="2rem" value={collateral} onChange={handleCollateralChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider flex="1" focusThumbOnChange={false} value={collateral} onChange={handleCollateralChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={collateral} />
      </Slider>
          </Flex>
          </GridItem>
          
          
          

          
          <GridItem colSpan={2}>
            <Button size="lg" w="full">
              Make a swap
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    );
  };
  
  export default Details;