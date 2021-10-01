import React, {createContext, useEffect, useState } from "react";
import {abi} from '../abi/abi'
import useTokenList from "../hook/useTokenList";
import useInputState from "../hook/useInputState";


export const MintFormContext = createContext();

export function MintFormProvider(props) {

  const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

  const [mintForm, setMintForm] = useState({
    holdToken:'0x6B175474E89094C44Da98b954EedeAC495271d0F',
    collateralToken:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    amount:0,
    swapOnMint: false,
    stopLoss: 0,
    takeProfit:0
  })

  const changeHoldToken = (val) => {
    console.log(val.target)
  setMintForm({...mintForm, val})
  } 

  const changeCollateralToken = (val) => {
    setMintForm({...mintForm, val})
    } 

    const changeAmount = (val) => {
      setMintForm({...mintForm, val})
      }
      const changeStopLoss = (val) => {
        setMintForm({...mintForm, val})
        } 

        const changeTakeProfit = (val) => {
          setMintForm({...mintForm, val})
          } 

            console.log(mintForm)

    return (
        <MintFormContext.Provider value={{mintForm,changeHoldToken,changeCollateralToken, changeAmount, changeStopLoss, changeTakeProfit  }}>

            {props.children}

        </MintFormContext.Provider>
    )
}

