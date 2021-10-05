import React, {createContext, useEffect, useState } from "react";


export const MintFormContext = createContext();

export function MintFormProvider(props) {


  const [mintForm, setMintForm] = useState({
    holdToken:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    collateralToken:'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    amount:1,
    swapOnMint: false,
    stopLoss: 0,
    takeProfit:0
  })

  const [tokenSymbols, setTokenSymbols] = useState({
    holdToken:'UNI',
    collateralToken:'ETH'
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

