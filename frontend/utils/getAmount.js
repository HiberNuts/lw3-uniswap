import { Contract } from "ethers";

import { EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constants";
import { abi as EXCHANGE_CONTRACT_ABI } from "../constants/Exchange.json";
import { abi as TOKEN_CONTRACT_ABI } from "../constants/Exchange.json";

export const getEtherBalance = async (provider, address, contract = false) => {
  try {
    if (contract) {
      const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getCDTokensBalance = async (provider, address) => {
  try {
    const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, provider);
    const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address);
    return balanceOfCryptoDevTokens;
  } catch (error) {
    console.error(error);
  }
};

export const getLPTokensBalance = async (provider, address) => {
  try {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (error) {
    console.error(error);
  }
};

export const getReserveOfCDTokens = async (provider) => {
  try {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (error) {
    console.error(error);
  }
};
