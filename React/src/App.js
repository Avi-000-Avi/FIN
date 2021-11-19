import React, { useEffect, useState, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MintFormProvider } from "./contexts/MintFormContext";
import { ContractProvider } from "./contexts/ContractContext";
import Landing from "./components/Views/Landing"
import MintPageNavbar from "./components/Navbar/MintPageNavbar";
import MintPageView from "./components/Views/MintPageView";
import PositionsView from "./components/Views/PositionsView";
import {
  Container,Flex
} from "@chakra-ui/react";

//STYLING


function App() {

  return (
    <div style={{backgroundColor:"#10152C",color:"white"}}>

    <ContractProvider>
      <MintFormProvider>
   <Switch>
   <Route exact path="/" component={Landing} />
   <div>
      <MintPageNavbar/>
      <Route exact path='/app' component={MintPageView}/>
      <Route exact path='/positions' component={PositionsView}/>
      </div>
      </Switch>
      </MintFormProvider>
    </ContractProvider>
    
    </div>
  );

}

export default App;