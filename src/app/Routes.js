import {Route, Routes} from 'react-router-dom';

import Home from '../features/homepage/Home';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';

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
    </Routes>
  );
}

export default Router;
