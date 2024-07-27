import { useEffect, useState } from 'react'
import { getProducts } from '../actions/all-actions';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

export default function MyProducts() {

    const {connected, publicKey} = useWallet()

    useEffect(() => {
        if(!connected || !publicKey) return;
        getProducts(publicKey).then( (x) => {setAllProducts(x); console.log(x.data ? Number(x.data) : ''); 
        } )
    }, [connected, publicKey])

    const [allProducts, setAllProducts] = useState<any[]>([])

    // const t = 'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S10-SS24D13_BIASSLIPDRESS_BURGUNDY-24206-BearePark-4716.webp?alt=media&token=d73fe4e1-1d6a-4a8a-8fa3-e17dee3bcb12'
    

  return (
    <>
    <div>My Products</div>
    
    </>
    
  )
}
