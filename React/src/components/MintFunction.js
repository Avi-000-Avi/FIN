import { Button } from '@chakra-ui/react';
import React,{useContext} from 'react'
import { ContractContext } from '../contexts/ContractContext';
import { MintFormContext } from '../contexts/MintFormContext';

export default function MintFunction() {

    const { signedContract, signer} = useContext(ContractContext);
    const {mintForm } = useContext(MintFormContext);
    
    const mint = async () => {
    
        let mintTx = await signedContract.mint(mintForm.holdToken, mintForm.collateralToken, mintForm.amount, mintForm.swapOnMint, mintForm.stopLoss, mintForm.takeProfit, {
            gasPrice: signer.getGasPrice(),
            gasLimit: 10000000,
          })
          .then((res) =>{
          console.log(res)
            
          })
    
      };

    return (
        <Button size="lg" w="full" onClick={mint}>
            
        </Button>
    )
}
