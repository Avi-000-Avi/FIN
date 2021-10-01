import React,{useContext} from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { MintFormContext } from '../contexts/MintFormContext';
 


export default function TradingViewComponent(props) {

  const {} =useContext(MintFormContext)


    return (
        <TradingViewWidget
        symbol={'ETHUSD'}
        theme={Themes.LIGHT}
        locale="eng"
        width={'650'}
        height={'500'}
      />
    )
}
