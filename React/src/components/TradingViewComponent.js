import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
 


export default function TradingViewComponent(props) {



    return (
        <TradingViewWidget
        symbol={props.pairs}
        theme={Themes.DARK}
        locale="eng"
        width={'650'}
        height={'500'}
      />
    )
}
