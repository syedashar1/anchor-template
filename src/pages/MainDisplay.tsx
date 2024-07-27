import { useEffect, useState } from 'react'
import { getProducts } from '../actions/all-actions';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay-ts';
import { AnchorProvider } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import { counterPDA, program } from '../anchor/setup';

export default function MainDisplay() {


  const [provider, setProvider] = useState<AnchorProvider | null>(null)
  const wallet = useAnchorWallet()
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet()
  const admin = new PublicKey('GeTHGKMyKwcr5LWqM645uC4pZLEBhAfm4QGw9o5RSBjk')

  useEffect(() => {
    const setup = async () => {
        if (wallet && publicKey && connected) {
            const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "finalized" });
            anchor.setProvider(provider);
            setProvider(provider);
            console.log(provider);
            
        }
    };
    setup();
}, [publicKey, connected]);

  useEffect(() => {
    getProducts().then((x) => {
      console.log(Number(x.data));
    }).catch(e => {
      console.warn('error: ', e)
    })
  }, [])

  const buy = async () => {
    if (!connected || !provider) {
      alert('Connect your wallet first.')
      return;
    }

    const transaction: Transaction = await program.methods.paySelf( 1
    )
      .accounts({
          systemProgram: anchor.web3.SystemProgram.programId,
          account: counterPDA,
          buyer: provider?.wallet.publicKey,
          to: admin,
      })
      .transaction();

    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = provider?.wallet.publicKey

    const fees = await transaction.getEstimatedFee(connection)
    console.log('fees', fees ? (fees / LAMPORTS_PER_SOL) : '');

    const simulateResult = await provider.connection.simulateTransaction(transaction);

    if (simulateResult.value.err) {
      console.error('Transaction simulation failed:', simulateResult.value.err);
    } else {
      console.log('Transaction simulation succeeded:', simulateResult);
    }


      // const transactionSignature = await sendTransaction(
      //     transaction,
      //     connection
      // );

    const tx = await provider.sendAndConfirm(transaction)
    console.log(tx);
    alert('succeded')
      
  }

  return (
    <div>
      <button style={{color: 'white', fontSize: '30px'}} onClick={buy}>
        Execute Buy
      </button>
    </div>
  )
}
