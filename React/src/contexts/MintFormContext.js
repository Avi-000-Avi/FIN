import React, {createContext, useEffect, useState } from "react";
export const MintFormContext = createContext();
export function MintFormProvider(props) {


  const [mintForm, setMintForm] = useState({
    holdToken:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    collateralToken:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    amount:1,
    swapOnMint: false,
    stopLoss: 0,
    takeProfit:0
  })

  const [tokenSymbols, setTokenSymbols] = useState({
    holdToken:'AAVE',
    collateralToken:'AAVE'
  })

  const changeHoldToken = (val) => {
    const token = val.target.value.split(',');
    const holdTokenSymbol = token[1]

    const contractAddress = token[0]
    setMintForm({...mintForm, holdToken: contractAddress})

    setTokenSymbols({...tokenSymbols, holdToken:holdTokenSymbol})
  } 

  const changeCollateralToken = (val) => {
    const token = val.target.value.split(',');
    const collateralTokenSymbol = token[1]

    const contractAddress = token[0]
    setMintForm({...mintForm, collateralToken: contractAddress})

    setTokenSymbols({...tokenSymbols, collateralToken: collateralTokenSymbol})
    } 

    const changeAmount = (val) => {
      setMintForm({...mintForm, amount: val})
      }
      const changeStopLoss = (val) => {
        setMintForm({...mintForm, stopLoss:val})
        } 

        const changeTakeProfit = (val) => {
          setMintForm({...mintForm, takeProfit: val})
          } 

          const toggleSwapOnMint = () => {
            setMintForm({...mintForm, swapOnMint: !mintForm.swapOnMint})
          }

            console.log(mintForm)

    return (
        <MintFormContext.Provider value={{mintForm,tokenSymbols,changeHoldToken,changeCollateralToken, changeAmount, changeStopLoss, toggleSwapOnMint, changeTakeProfit  }}>

            {props.children}

        </MintFormContext.Provider>
    )
}

