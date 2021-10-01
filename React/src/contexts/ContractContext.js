import React, { createContext, useState } from "react";
import { abi } from "../abi/abi";
import { web3 } from "web3";
import { ethers, BigNumber } from "ethers";

export const ContractContext = createContext();

export function ContractProvider(props) {
  const contractAddress = "0x82e01223d51eb87e16a03e24687edf0f294da6f1";
  const ABI = abi.abi;
  const ALCHEMY = "https://eth-mainnet.alchemyapi.io/v2/XLbyCEcaLhQ3x_ZaKBmZqNp8UGgNGX2F";

  const [stateUserAddress, setstateUserAddress] = useState('')
  const [signedContract, setSignedContract] = useState()
  const [signer, setSigner] = useState()

  let provider;
  let userAddress;

  const connect = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    //  provider = new ethers.providers.JsonRpcProvider();
    await provider.send("eth_requestAccounts", [0]);
    let signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, ABI, provider);

    let signedContract = contract.connect(signer);

    userAddress = await signer.getAddress();

    setSignedContract(signedContract)

    setstateUserAddress(userAddress)

    setSigner(signer)

    console.log('success', signer, signedContract, userAddress)

  };

  return (
    <ContractContext.Provider value={{connect, stateUserAddress, signedContract, signer}}>
      {props.children}
    </ContractContext.Provider>
  );
}
