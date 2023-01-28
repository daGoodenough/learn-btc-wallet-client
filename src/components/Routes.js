import {Route, Routes} from 'react-router-dom';

import Home from './Home';
import Login from './auth/Login';
import PrivateKey from './PrivateKey';

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
        path='/generate-privkey'
        element={<PrivateKey/>}
      />
    </Routes>
  );
}

export default Router;
