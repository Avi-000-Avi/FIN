import React, {createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMoralis,useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import {abi} from '../abi/abi'

const CONTRACT_ADDRESS = '0xCD8a1C3ba11CF5ECfa6267617243239504a98d90' //deploy to hardhat after compile then add contractaddress here
const contractAbi = abi.abi //exported abi for now




export const ContractContext = createContext();

export function ContractProvider(props) {

    const [contract, setContract] = useState()

    const options = {
        chain: "hardhat",
        address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      };

const {authenticate, logout,isInitialized, isAuthenticated,authError, hasAuthError,user, enableWeb3,isAuthenticating, isWeb3Enabled, Moralis, web3} = useMoralis()

const Web3Api = useMoralisWeb3Api()

useEffect(()=>{

    if (isInitialized) {
        enableWeb3();
        setContract(new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS))

        Web3Api.account.getTransactions();
      }
    }, [isInitialized, Moralis]);

    if (!isInitialized) {
        return null;
      }

    return (
        <ContractContext.Provider value={{contract}}>

            {props.children}

        </ContractContext.Provider>
    )
}

