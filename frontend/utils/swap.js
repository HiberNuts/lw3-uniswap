//It has two functions getAmountOfTokenReceivedFromSwap and swapTokens

import { Contract } from "ethers";
import { EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constants";
import { abi as EXCHANGE_CONTRACT_ABI } from "../constants/Exchange.json";
import { abi as TOKEN_CONTRACT_ABI } from "../constants/Exchange.json";

export const getAmountOfTokenReceivedFromSwap = async (
  _swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  reservedCD
) => {
  const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
  let amountOfTokens;

  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(_swapAmountWei, ethBalance, reservedCD);
  } else {
    amountOfTokens = await exchangeContract.getAmountOfTokens(_swapAmountWei, reservedCD, ethBalance);
  }

  return amountOfTokens;
};

export const swapTokens = async (signer, swapAmountWei, tokenToBeReceivedAfterSwap, ethSelected) => {
  try {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);
    const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer);

    let tx;
    if (ethSelected) {
      tx = await exchangeContract.ethToCryptoDevToken(tokenToBeReceivedAfterSwap, {
        value: swapAmountWei,
      });
    } else {
      tx = await tokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, swapAmountWei.toString());
      await tx.wait();

      tx = await exchangeContract.cryptoDevTokenToEth(swapAmountWei, tokenToBeReceivedAfterSwap);
    }
    await tx.wait();
  } catch (error) {
    console.log(error);
  }
};
