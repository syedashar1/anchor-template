import { program, counterPDA } from "../anchor/setup";
import { PublicKey } from '@solana/web3.js';

export const getProducts = async (address?: PublicKey, index?: number) => {
  // @ts-ignore
  const x = await program.account.accountStruct.fetch(counterPDA)
  return x
}
