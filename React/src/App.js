  
import React from "react";

import { ContractProvider } from "./contexts/ContractContext";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//styling


import MintPage from "./components/MintPage";
import Landing from "./components/Landing";



function App()   {


  return (
    <ContractProvider>

    <Route exact path='/' component={Landing}/>
    <Route exact path='/app' component={MintPage}/>

    </ContractProvider>


  );
}

export default App;
