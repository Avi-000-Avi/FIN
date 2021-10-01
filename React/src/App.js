import React, { useEffect, useState, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MintFormProvider } from "./contexts/MintFormContext";
import { ContractProvider } from "./contexts/ContractContext";
import Landing from "./components/Landing"
import MintPage from "./components/MintPage"

//STYLING

import {
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  HStack,
  Image,
  AspectRatio,
  Divider,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import { FcCandleSticks } from "react-icons/fc";


function App() {



  return (
    <Fragment>
    <ContractProvider>
      <MintFormProvider>

      <Route exact path='/' component={Landing}/>
      <Route exact path='/app' component={MintPage}/>

      </MintFormProvider>
    </ContractProvider>
    </Fragment>
  );
}

export default App;
