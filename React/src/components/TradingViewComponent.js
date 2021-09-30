import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
 


export default function TradingViewComponent(props) {



    return (
        <TradingViewWidget
        symbol={props.pairs}
        theme={Themes.LIGHT}
        locale="eng"
        width={'650'}
        height={'500'}
      />
    )
}
