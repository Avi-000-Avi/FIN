import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aileron";
import { Button } from "@chakra-ui/button";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    colors: {
      brand: {
        100: "#c19161f",
        200: "#aa7cf2",
        300: "#23e8a0",
        400: "#33a4f3", 
        500: "#0fb5dc",
        600: "#d8d8d8",
      },
    },
    global: {
      body: {
        bg: "#c19161f",
        color: "white",
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "bold", 
          colorScheme: "#23e8a0"
        }
      }
    
    }
  },
  config
);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <MoralisProvider
      appId="oIWpB36MUQD5pleNzFP7gPRS5CDU103z5iNJ430q"
      serverUrl="https://z8j0wi86a6ia.moralishost.com:2053/server"
    >
      <Router>
        <App />
      </Router>
    </MoralisProvider>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
