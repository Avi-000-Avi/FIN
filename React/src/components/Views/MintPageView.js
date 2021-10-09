import React, { Fragment, useState } from "react";
import "./MintPage.css";

// STYLING AND ASSETS
import heroBg from "../../assets/MintPageForm/hero-bg.svg";
import group33937 from "../../assets/MintPageForm/group33937.svg";
import rectangle141 from "../../assets/MintPageForm/rectangle141.jpg";
import { SimpleGrid, Button, } from "@chakra-ui/react";
import { Container, Box,Flex } from "@chakra-ui/layout";
import { Popover, PopoverTrigger, PopoverContent} from "@chakra-ui/popover";
import FocusLock from "@chakra-ui/focus-lock";
import { Text } from "@chakra-ui/layout";

import MintFormDetails from "../MintFormDetails";
import MintPageNavbar from "../Navbar/MintPageNavbar";
import TradingViewComponent from "../TradingViewComponent";
import Vector from "../../assets/Vector.png";

export default function MintPageView(props) {
  const [isOpen, setIsOpen] = useState(false);
  const firstFieldRef = React.useRef(null);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Container maxW="container.xl" p={0} boxShadow="base" p ={10} backgroundColor="#232945" borderRadius="10">
            
            <Flex py={[0, 10, 20]}
      direction={{ base: 'column-reverse', md: 'row' }}>
            <MintFormDetails /> 
     <TradingViewComponent firstFieldRef={firstFieldRef} />
     </Flex>
     <img src ={Vector}/>
    </Container>
  );
}
