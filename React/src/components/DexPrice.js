import React,{useContext, useState, useEffect} from 'react'
import axios from 'axios';
import { MintFormContext } from '../contexts/MintFormContext';
import { Text } from '@chakra-ui/layout';

const API = 'BRZgJuJfeIi0zdfPwx93Yff7SZfG35QLVYTT2DyusTQ'


export default function DexPrice() {

    const {tokenSymbols, mintForm} =useContext(MintFormContext)

    const [holdTokenPrice, setholdTokenPrice] = useState()
    const [collateralTokenPrice, setcollateralTokenPrice] = useState()

    
    

    useEffect(()=>{


     axios.get(`https://api.dev.dex.guru/v1/chain/1/tokens/${mintForm.holdToken}/market?api-key=BRZgJuJfeIi0zdfPwx93Yff7SZfG35QLVYTT2DyusTQ`)
    .then(res => {
        setholdTokenPrice(res.data.price_usd)
        return res
    })
    
    },[mintForm.holdToken])

    useEffect(()=>{
        const delay = () =>setTimeout(() => {
            axios.get(`https://api.dev.dex.guru/v1/chain/1/tokens/${mintForm.collateralToken}/market?api-key=BRZgJuJfeIi0zdfPwx93Yff7SZfG35QLVYTT2DyusTQ`)
        .then(res => setcollateralTokenPrice (res.data.price_usd))
            }, 3000)
    
            delay()
    },[])
   


    
    return (
        <div>
           <Text>Onchain Price by DEX Guru: {holdTokenPrice}</Text> 
           <Text>{`${tokenSymbols.holdToken}/ETH`}</Text> 
        </div>
    )
}
