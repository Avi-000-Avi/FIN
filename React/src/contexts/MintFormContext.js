import React, {createContext, useEffect, useState } from "react";
export const MintFormContext = createContext();
export function MintFormProvider(props) {

  const url = window.location.pathname.split('/').pop();


  const [mintForm, setMintForm] = useState()

  const [tokenSymbols, setTokenSymbols] = useState()

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

          useState(()=>{

            setMintForm({
              holdToken:'0x514910771af9ca656af840dff83e8264ecf986ca',
              collateralToken:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              amount:'0',
              swapOnMint: false,
              stopLoss: 0,
              takeProfit:0
            })

            setTokenSymbols({
              holdToken:'LINK',
              collateralToken:'USDC'
            })


          },[url])

            console.log(mintForm)

    return (
        <MintFormContext.Provider value={{mintForm,tokenSymbols,changeHoldToken,changeCollateralToken, changeAmount, changeStopLoss, changeTakeProfit  }}>

            {props.children}

        </MintFormContext.Provider>
    )
}

