import {Route, Routes} from 'react-router-dom';

import Home from '../features/homepage/Home';
import Login from '../features/auth/Login';

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
    </Routes>
  );
}

export default Router;
