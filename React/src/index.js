import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, theme } from "@chakra-ui/react"

ReactDOM.render(
  <ChakraProvider theme={theme}>
  <MoralisProvider appId="oIWpB36MUQD5pleNzFP7gPRS5CDU103z5iNJ430q" serverUrl="https://z8j0wi86a6ia.moralishost.com:2053/server">
    <Router>
    <App/>
    </Router>
  </MoralisProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
