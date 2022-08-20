//Ratio is -> (amount of Eth that would be sent back to the user / Eth reserve) = (LP tokens withdrawn) / (total supply of LP tokens)

// By some maths we get -> (amount of Eth that would be sent back to the user) = (Eth Reserve * LP tokens withdrawn) / (total supply of LP tokens)

// Similarly we also maintain a ratio for the CD tokens, so here in our case

// Ratio is -> (amount of CD tokens sent back to the user / CD Token reserve) = (LP tokens withdrawn) / (total supply of LP tokens)

// Then (amount of CD tokens sent back to the user) = (CD token reserve * LP tokens withdrawn) / (total supply of LP tokens)

import { Contract, providers, utils, BigNumber } from "ethers";

import { EXCHANGE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constants";
import { abi as EXCHANGE_CONTRACT_ABI } from "../constants/Exchange.json";
import { abi as TOKEN_CONTRACT_ABI } from "../constants/Exchange.json";

/**
 * removeLiquidity: Removes the `removeLPTokensWei` amount of LP tokens from
 * liquidity and also the calculated amount of `ether` and `CD` tokens
 */

export const removeLiquidity = async (signer, removeLPTokensWei) => {
  const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);

  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
};

export const getTokensAfterRemove = async (provider, removeLPTokenWei, _ethBalance, cryptoDevTokenReserve) => {
  try {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
    const _totalSupply = await exchangeContract.totalSupply();

    const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve.mul(removeLPTokenWei).div(_totalSupply);

    return {
      _removeEther,
      _removeCD,
    };
  } catch (error) {
    console.error(error);
  }
};
