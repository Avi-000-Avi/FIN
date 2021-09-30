import React,{useContext} from 'react'
import { ContractContext } from '../contexts/ContractContext';
import MintPageNavbar from './Navbar/MintPageNavbar'



export default function MintPage() {



    const {contract} = useContext(ContractContext);

    return (
        <div>
            <MintPageNavbar/>
        </div>
    )
}
