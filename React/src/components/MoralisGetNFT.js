import React,{Fragment, useContext, useState} from 'react'
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Table, Thead, Tr, Th, Td, Tbody,Container } from '@chakra-ui/react';

import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { ContractContext } from '../contexts/ContractContext';

export default function MoralisGetNFT() {

    const { connect, stateUserAddress, signedContract,contractAddress } =  useContext(ContractContext);
  const { Moralis, isInitialized } = useMoralis();

  console.log(isInitialized)
  const Web3API = useMoralisWeb3Api()

  const [address, setAddress] = useState('')
  const [positionData, setPositionData] = useState([]);


  const changeAddress = (e) => {
    setAddress(e.target.value)
  }

  const getPositionsFromAddress = (e) => {


      if (isInitialized){
  
        const options = { chain: "rinkeby", address: address };
      
      const getnftOwners = async () => {
       const nftOwners =  await Web3API.account.getNFTs(options)
       console.log(nftOwners.result)

    

        setPositionData(nftOwners.result)
      };
      getnftOwners()
      
      }



  }


  


    return (
    <Container maxW="1400px" maxH="1000px" color="white" boxShadow="base" backgroundColor="#232945">
        <FormControl id="address">
        <FormLabel>Get Positions from Address with Moralis API (Rinkeby)</FormLabel>
        <Input width='500px' onChange={changeAddress} value={address} type="text" />
        <Button onClick={getPositionsFromAddress} margin={2} boxShadow="base" colorScheme='mintApprove'  _hover={{
    background: "white",
    color: "teal",
  }}> Search </Button>
      </FormControl>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Token ID</Th>
            <Th>Block Number Minted</Th>
            <Th>Date Minted</Th>
            <Th>Block Explorer Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {positionData.map((position) => (
            <Tr key={position.token_id}>
              <Td>{position.token_id}</Td>
              <Td>{position.block_number_minted}</Td>
              <Td>{position.synced_at}</Td>
              <Td><a target="_blank" href={`https://rinkeby.etherscan.io/token/${contractAddress}?a=${position.token_id}`} > Details </a></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      </Container>
    )
}
