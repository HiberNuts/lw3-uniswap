//addLiquidity.js has two functions addLiquidity and calculateCD

import { Contract, utils } from "ethers";

import { EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constants";
import { abi as EXCHANGE_CONTRACT_ABI } from "../constants/Exchange.json";
import { abi as TOKEN_CONTRACT_ABI } from "../constants/Exchange.json";

export const addLiquidity = async (signer, addCDAmountWei, addEtherAmountWei) => {
  try {
    const tokenContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);

    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);

    let tx = await tokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, addCDAmountWei.toString());
    await tx.wait();

    tx = await exchangeContract.addLiquidity(addCDAmountWei, { value: addEtherAmountWei, gasLimit: 40000 });

    await tx.wait();
  } catch (error) {
    console.error(error);
  }
};

export const calculateCD = async (_addEther = "0", etherBalanceContract, cdTokenReserve) => {
  const _addEtherAmountWei = utils.parseEther(_addEther);
  const cryptoDevTokenAmount = _addEtherAmountWei.mul(cdTokenReserve).div(etherBalanceContract);

  return cryptoDevTokenAmount;
};
