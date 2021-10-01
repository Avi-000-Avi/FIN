import React,{useContext} from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { MintFormContext } from '../contexts/MintFormContext';
 


export default function TradingViewComponent(props) {

  const {tokenSymbols} =useContext(MintFormContext)


    return (
        <TradingViewWidget
        symbol={`${tokenSymbols.holdToken}${tokenSymbols.collateralToken}`}
        theme={Themes.LIGHT}
        locale="eng"
        width={'650'}
        height={'500'}
      />
    )
}
