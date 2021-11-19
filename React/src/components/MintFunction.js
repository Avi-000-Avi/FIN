import { Button } from "@chakra-ui/button";
import React, { useContext, useState, useEffect } from "react";
import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";
import { ERC20abi } from "../abi/ERC20abi";
import { BigNumber, ethers, utils } from "ethers"
import { Text } from "@chakra-ui/layout";


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
  //  const maxPrice = ethers.utils.parseUnits(mintForm.takeProfit, 18);
   // const minPrice = ethers.utils.parseUnits(mintForm.stopLoss, 18);
    
     const mintTx = await signedContract.mint(
      {
        fromToken: mintForm.holdToken,
        toToken: mintForm.collateralToken,
        amount: amount,
        takeProfit: mintForm.takeProfit,
        stopLoss: mintForm.stopLoss,
        maxGasPrice: 100000
      },{
        gasPrice: signer.getGasPrice(),
        gasLimit: 400000,
      })
      .catch((e)=>window.alert(e.message))

      // const tx = await mintTx.wait()
      // .catch((e)=>window.alert(e.message))


      // if(tx){
      //   window.alert(`Transaction confirmed! See TxID here: https://rinkeby.etherscan.io/tx/${tx.transactionHash}`)
      // }


     
  };

  const approve = async () => {
    let contract = new ethers.Contract(mintForm.holdToken, ERC20abi, provider);

    let signedERC20 = contract.connect(signer);


    let mintTx = await signedERC20.approve(
      contractAddress,
      ethers.constants.MaxUint256,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 300000,
      }
    );

    const tx = await mintTx.wait()

    if(tx.confirmations ==1){
      window.alert(`Transaction confirmed! See TxID here: https://rinkeby.etherscan.io/tx/${tx.transactionHash}`)
      checkIsApproved()
    }

  };

  const checkIsApproved = async () => {
    let contract = new ethers.Contract(mintForm.holdToken, ERC20abi, provider);

    let mintTx = await contract.allowance(
      stateUserAddress,
      contractAddress,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 300000,
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

  if(!stateUserAddress){
    return (
    <Text>
      Connect Wallet
    </Text>)
  }

  return (
    <div>

      {isApproved?
      <Button size="lg"  colorScheme="teal" variant ="outline" onClick={mint}>
      Mint
    </Button>:

<Button size="lg" boxShadow="2xl" colorScheme="teal"  _hover={{
    background: "white",
    color: "teal",
  }}  onClick={approve}>
        Approve
      </Button>

      }

    </div>
  );
}