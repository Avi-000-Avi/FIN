import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <MoralisProvider appId="4S12Z6OWMk2IkfGcKr712xLVTldKoSt2jM2PXM0T" serverUrl="https://jatfccjcovh3.moralishost.com:2053/server">
    <Router>
    <App />
    </Router>
  </MoralisProvider>,
=======
import { ChakraProvider } from "@chakra-ui/provider";
import { MoralisProvider } from "react-moralis";

const appId = "ZPm0AMIy2nn0lSdNgDLg6g7tVRP6F7gK2t9L6V6f"
const serverUrl = "https://ddnwackqf7dj.moralishost.com:2053/server"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
>>>>>>> Avinash
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
