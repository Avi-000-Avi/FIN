import React, { useEffect, useState, useContext } from "react";
import { ContractContext } from "../../contexts/ContractContext";
import { Button } from "@chakra-ui/button";
import { BigNumber, ethers, utils } from "ethers";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import BurnFunction from "../BurnFunction";
import DexPrice from "../DexPrice";
import MoralisGetNFT from "../MoralisGetNFT";

export default function PositionsView() {
  const {
    signedContract,
    signer,
    stateUserAddress,
    provider,
    contractAddress,
  } = useContext(ContractContext);

  const [tokenIds, setTokenIds] = useState([]);
  const [positionData, setPositionData] = useState([]);

  const showPositions = async () => {
    if (stateUserAddress) {
      const getOwnedPositions = async () => {
        const positions = await signedContract.getOwnedPositions();

        await (async () => {
          let positionIds = [];

          for (let i = 0; i < positions.length; i++) {
            positionIds.push(positions[i]);
          }

          setTokenIds(positionIds);

          let res = [];

          for (let i = 0; i < tokenIds.length; i++) {
            let position = await signedContract.getPosition(tokenIds[i]);

            if (true
              // position.fromToken.toString() !==
              // "0x0000000000000000000000000000000000000000"
            ) {
              res.push({
                id: position.id._hex.toString(),
                inputToken: position.fromToken.toString(),
                recieveToken: position.toToken.toString(),
                amount: utils.formatEther(position.amount.toString(), {
                  commify: true,
                  pad: true,
                }),
                maxPrice: position.takeProfit.toString(),
                minPrice: position.stopLoss.toString(),
              });
            }
          }

          setPositionData(res);
        })();
      };
      getOwnedPositions();
    }
  };

  useEffect(() => {
    showPositions();
  }, [stateUserAddress]);

  return (
    <div>
      <Button onClick={showPositions}> Show Positions </Button>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Token ID</Th>
            <Th>Input Token</Th>
            <Th>Recieve Token</Th>
            <Th isNumeric>DEX Price</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric> Max Price </Th>
            <Th isNumeric> Min Price </Th>
          </Tr>
        </Thead>
        <Tbody>
          {positionData.map((position) => (
            <Tr>
              <Td>{position.id}</Td>
              <Td>{position.inputToken}</Td>
              <Td>{position.recieveToken}</Td>
              <Td><DexPrice inputToken={position.inputToken} /> </Td>
              <Td isNumeric>{position.amount}</Td>
              <Td isNumeric>{position.maxPrice}</Td>
              <Td isNumeric>{position.minPrice}</Td>
              <Td isNumeric>
                <BurnFunction tokenId={position.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <MoralisGetNFT/>
    </div>
  );
}
