import React, { useEffect, useState, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MintFormProvider } from "./contexts/MintFormContext";
import { ContractProvider } from "./contexts/ContractContext";
import Landing from "./components/Landing"
import MintPage from "./components/MintPage"

//STYLING

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