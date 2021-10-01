import { Button } from '@chakra-ui/react';
import React,{useContext} from 'react'
import { ContractContext } from '../contexts/ContractContext';
import { MintFormContext } from '../contexts/MintFormContext';
import { ERC20abi } from '../abi/ERC20abi';
import { ethers } from 'ethers';

export default function MintFunction() {

    const { signedContract, signer, stateUserAddress, provider,contractAddress} = useContext(ContractContext);
    const {mintForm } = useContext(MintFormContext);
    
    const mint = async () => {
    
        let mintTx = await signedContract.mint(mintForm.holdToken, mintForm.collateralToken, mintForm.amount, mintForm.swapOnMint, mintForm.stopLoss, mintForm.takeProfit, {
            gasPrice: signer.getGasPrice(),
            gasLimit: 100000,
          })
          .then((res) =>{
          console.log(res)
            
          })
    
      };

      const approve = async () => {


let contract = new ethers.Contract(mintForm.holdToken, ERC20abi, provider)

let signedContract = contract.connect(signer)

let mintTx = await signedContract.approve(contractAddress, mintForm.amount,{
    gasPrice: signer.getGasPrice(),
    gasLimit: 100000,
  })          .then((res) =>{
    console.log(res)
      
    })


    
      };

    return (
        <div>
        <Button size="lg" w="full" onClick={mint}>
            Mint
        </Button>

        <Button size="lg" w="full" onClick={approve}>
            Approve
        </Button>

        <Button size="lg" w="full" onClick={async () => await signedContract.getOwnedPositions().then(e=>console.log(e  ))}>
            Get Positions 
        </Button>


        </div>

        
    )
}
