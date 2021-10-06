import React, { useEffect, useState, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MintFormProvider } from "./contexts/MintFormContext";
import { ContractProvider } from "./contexts/ContractContext";
import Landing from "./components/Views/Landing"
import MintPageNavbar from "./components/Navbar/MintPageNavbar";
import MintPageView from "./components/Views/MintPageView";
import PositionsView from "./components/Views/PositionsView";

//STYLING




function App() {



  return (
    <Fragment>
    <ContractProvider>
      <MintFormProvider>

      <Route exact path='/' component={Landing}/>

      <MintPageNavbar />
      <Route exact path='/app' component={MintPageView}/>
      <Route exact path='/positions' component={PositionsView}/>

      </MintFormProvider>
    </ContractProvider>
    </Fragment>
  );
}

export default App;
