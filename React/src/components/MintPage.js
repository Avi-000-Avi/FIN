import React,{useContext} from 'react'
import { ContractContext } from '../contexts/ContractContext';
import { MintFormContext } from '../contexts/MintFormContext';
import Details from './Details';
import TradingViewComponent from './TradingViewComponent';
import MintPageNavbar from './Navbar/MintPageNavbar';



export default function MintPage() {

    return (
        <div>
            <MintPageNavbar/>
            <Details />
            <TradingViewComponent />
        </div>
    )
}
