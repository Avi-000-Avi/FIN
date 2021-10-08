import React,{useContext, useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import { MintFormContext } from '../contexts/MintFormContext';
import { Text } from '@chakra-ui/layout';

const DEXGURU_API = process.env.REACT_APP_DEXGURU_API

console.log(DEXGURU_API)


export default function DexPrice(props) {

    const {tokenSymbols, mintForm} =useContext(MintFormContext)

    const [holdTokenPrice, setholdTokenPrice] = useState()
    const [collateralTokenPrice, setcollateralTokenPrice] = useState()

    
    

    useEffect(()=>{

        if(props.inputToken){

            axios.get(`https://api.dev.dex.guru/v1/chain/1/tokens/${props.inputToken}/market?api-key=${DEXGURU_API}`)
            .then(res => {
                console.log(res.data.price_usd)
                setholdTokenPrice(res.data.price_usd.toFixed(2))
                return res
            })
            
        }else{


    //  axios.get(`https://api.dev.dex.guru/v1/chain/1/tokens/${mintForm.holdToken}/market?api-key=${DEXGURU_API}`)
    // .then(res => {
    //     setholdTokenPrice(res.data.price_usd)
    //     return res
    // })

}
    
    },[mintForm.holdToken])

   


    
    return (
        <Fragment>
           <Text>DEX PRICE: $ {holdTokenPrice}</Text> 
        </Fragment>
    )
}
