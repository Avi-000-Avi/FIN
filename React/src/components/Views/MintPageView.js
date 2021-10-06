import React, { Fragment, useState } from "react";
import "./MintPage.css";

// STYLING AND ASSETS
import heroBg from "../../assets/MintPageForm/hero-bg.svg";
import group33937 from "../../assets/MintPageForm/group33937.svg";
import rectangle141 from "../../assets/MintPageForm/rectangle141.jpg";
import { SimpleGrid, Button, } from "@chakra-ui/react";
import { Container, Box } from "@chakra-ui/layout";
import { Popover, PopoverTrigger, PopoverContent} from "@chakra-ui/popover";
import FocusLock from "@chakra-ui/focus-lock";
import { Text } from "@chakra-ui/layout";

import Details from "../MintFormDetails";
import MintPageNavbar from "../Navbar/MintPageNavbar";
import TradingViewComponent from "../TradingViewComponent";

export default function MintPageView(props) {
  const [isOpen, setIsOpen] = useState(false);
  const firstFieldRef = React.useRef(null);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Container>
      <Box pos="relative" w="100%" zIndex={-100}>
        <div className="container-center-horizontal">
          <div className="mint-page">
            <SimpleGrid columns={1} pos="absolute" zIndex={99}>
              <Box>
                <Details />
              </Box>

              <Box >
              <Popover
              isLazy
              initialFocusRef={firstFieldRef}
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        closeOnBlur={false}
      >
        <PopoverTrigger >
          <Fragment > <Text >{''}</Text> </Fragment>
        </PopoverTrigger>
        <PopoverContent bg="blue.800" borderColor="blue.800" zIndex={99} p={0} top={'250px'} left={'150px'} >
          <FocusLock returnFocus persistentFocus={false}>
            <TradingViewComponent firstFieldRef={firstFieldRef} />
          </FocusLock>
        </PopoverContent>
      </Popover>
              </Box>
            </SimpleGrid>

            <div className="overlap-group">


              <img className="hero-bg" src={heroBg} />

              <Button mr={5} bottom={'65px'} width={'80px'} onClick={open} zIndex={99}>
                <img  className="group-33937" src={group33937} />
              </Button>
             

              
            </div>
          </div>
        </div>
      </Box>

      
    </Container>
  );
}
