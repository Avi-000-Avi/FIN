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
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      };

const {authenticate, logout,isInitialized, isAuthenticated,authError, hasAuthError,user, enableWeb3,isAuthenticating, isWeb3Enabled, Moralis, web3} = useMoralis()

const Web3API = useMoralisWeb3Api();



useEffect( ()=>{

    if (isInitialized) {
        enableWeb3();
        setContract(new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS))

        const getPrice = async () => {
          try{
            const transactions = await Web3API.account.getTokenBalances({address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", chain:'hardhat'})
            console.log(transactions)
          }catch(e){
            console.log(e)
          }
          
        }
        
        getPrice();
        
        
        
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

