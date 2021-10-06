import { Button } from "@chakra-ui/button";
import React, { useContext, useState, useEffect } from "react";
import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";
import { ERC20abi } from "../abi/ERC20abi";
import { BigNumber, ethers, utils } from "ethers"


export default function MintFunction() {
  const {
    signedContract,
    signer,
    stateUserAddress,
    provider,
    contractAddress,
  } = useContext(ContractContext);
  const { mintForm } = useContext(MintFormContext);

  const [isApproved, setIsApproved] = useState(false)

  const mint = async () => {
    //parse units has to be changed to get tokens decimal count in second param
    const amount = ethers.utils.parseUnits(mintForm.amount, 18);

    let mintTx = await signedContract.mint(
      mintForm.holdToken,
      amount,
      mintForm.stopLoss,
      mintForm.takeProfit
    );
  };

  const approve = async () => {
    let contract = new ethers.Contract(mintForm.holdToken, ERC20abi, provider);

    let signedERC20 = contract.connect(signer);


    let mintTx = await signedERC20.approve(
      contractAddress,
      ethers.constants.MaxUint256,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 100000,
      }
    );
  };

  const checkIsApproved = async () => {
    let contract = new ethers.Contract(mintForm.holdToken, ERC20abi, provider);

    //allowance(address owner, address spender)

    let mintTx = await contract.allowance(
      stateUserAddress,
      contractAddress,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 100000,
      }
    ).then(res=>{
      if (res._hex !== "0x00"){
        setIsApproved(true)
      }else{
        setIsApproved(false)
      }
      }
      
      
      )
  };



  useEffect(() => {
    if(signer){
    checkIsApproved()
    }
   
  }, [mintForm.holdToken, signer ])

  return (
    <div>

      {isApproved?
      <Button size="lg"  colorScheme="blue" onClick={mint}>
      Mint
    </Button>:

<Button size="lg"  colorScheme="blue" onClick={approve}>
        Approve
      </Button>

      }

    </div>
  );
}
