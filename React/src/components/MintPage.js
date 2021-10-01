import React,{useContext} from 'react'
import { ContractContext } from '../contexts/ContractContext';
import { MintFormContext } from '../contexts/MintFormContext';
import Details from './Details';
import TradingViewComponent from './TradingViewComponent';



export default function MintPage() {

    return (
        <div>
            <Details />
            <TradingViewComponent />
        </div>
    )
}
