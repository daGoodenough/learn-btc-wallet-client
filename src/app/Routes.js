import {Route, Routes} from 'react-router-dom';

import Home from '../features/homepage/Home';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import WalletlPage from '../features/wallets/WalletPage';

const Router = () => {
  return (
    <Routes>
      <Route 
        exact
        path='/'
        element={<Home/>}
      />
      <Route 
        exact
        path='/login'
        element={<Login/>}
      />
      <Route
        exact
        path='/signup'
        element={<Signup/>}
      />
      <Route 
        path='wallet/:walletId'
        element={<WalletlPage/>}
      />
    </Routes>
  );
}

export default Router;
