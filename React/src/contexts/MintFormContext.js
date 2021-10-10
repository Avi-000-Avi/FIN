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
              holdToken:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
              collateralToken:'0x6B175474E89094C44Da98b954EedeAC495271d0F',
              amount:'0',
              swapOnMint: false,
              stopLoss: 0,
              takeProfit:0
            })

            setTokenSymbols({
              holdToken:'UNI',
              collateralToken:'DAI'
            })


          },[url])

            console.log(mintForm)

    return (
        <MintFormContext.Provider value={{mintForm,tokenSymbols,changeHoldToken,changeCollateralToken, changeAmount, changeStopLoss, changeTakeProfit  }}>

            {props.children}

        </MintFormContext.Provider>
    )
}

