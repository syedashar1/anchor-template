import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import MainDisplay from './pages/MainDisplay';
import MyProducts from './pages/MyProducts';
import ProductDetail from './pages/ProductDetail';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import logo from './assets/logo.png'
import { useWallet } from '@solana/wallet-adapter-react';

function App() {

  const { connected } = useWallet()

  return (
    <Router>
      <div>
      <div className='nav-here'>
        <Link to={'/'}><img src={logo} /></Link>
        <div>
        {connected ? <Link className='hide-mine' to={'/mine'} style={{color: 'black', fontSize: '18px', marginRight: '26px'}}>View Mine</Link> : ''}
        <WalletMultiButton />
        </div>
      </div>
        <Routes>
          <Route path='/' element={<MainDisplay/>}/>
          {/* <Route path='/product/:index' element={<ProductDetail/>}/> */}
          <Route path='/mine' element={<MyProducts/>}/>
        </Routes>

      </div>
    </Router>
  )
}

export default App
