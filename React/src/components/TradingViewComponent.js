import React,{useContext} from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { MintFormContext } from '../contexts/MintFormContext';
 import { Box } from '@chakra-ui/layout';


export default function TradingViewComponent(props) {

  const {tokenSymbols} =useContext(MintFormContext)


    return (
      <Box >
        <TradingViewWidget
        symbol={`${tokenSymbols.holdToken}${tokenSymbols.collateralToken}`}
        theme={Themes.DARK}
        locale="eng"
        width={'500'}
        height={'400'}
        
      />
      </Box>
    )
}


