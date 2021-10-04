import React,{useContext, useState} from 'react'
import axios from 'axios';
import { MintFormContext } from '../contexts/MintFormContext';
 import { Text } from '@chakra-ui/layout';



  

export default function DexPrice() {

    const {tokenSymbols, mintForm} =useContext(MintFormContext)

    const [price, setPrice] = useState('')

    const holdToken = axios.get(`https://api.0x.org/swap/v1/quote?buyToken=${tokenSymbols.holdToken}&sellToken=WETH&sellAmount=100000000000000000`)
    .then(res => setPrice(res.data.price))
    
    return (
        <div>
           <Text>DEX Price by 0x: {price}</Text> 
           <Text>{`${tokenSymbols.holdToken}/ETH`}</Text> 
        </div>
    )
}
