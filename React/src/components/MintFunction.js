import { Button } from "@chakra-ui/button";
import React, { useContext } from "react";
import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";
import { ERC20abi } from "../abi/ERC20abi";
import { ethers, BigNumber } from "ethers";


export default function MintFunction() {
  const {
    signedContract,
    signer,
    stateUserAddress,
    provider,
    contractAddress,
  } = useContext(ContractContext);
  const { mintForm } = useContext(MintFormContext);

  const mint = async () => {
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
   const balance = await signedERC20.balanceOf(contractAddress)

   const res = ethers.utils.formatEther(balance)
  
   console.log(res)

    let mintTx = await signedERC20.approve(
      contractAddress,
      ethers.constants.MaxUint256,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 100000,
      }
    );
  };

  const getOwnedPositions = async () => {

     const positions = await signedContract.getOwnedPositions()

      const res = ethers.BigNumber.from(positions[0])
     console.log(res)
  }

  return (
    <div>
      <Button size="lg" w="full" onClick={mint}>
        Mint
      </Button>

      <Button size="lg" w="full" onClick={approve}>
        Approve
      </Button>

      <Button
        size="lg"
        w="full"
        onClick={getOwnedPositions}
      >
        Get Positions
      </Button>
    </div>
  );
}
