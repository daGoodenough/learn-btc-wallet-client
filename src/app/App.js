import Routes from './Routes';
import TopNav from './TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../features/auth/authSlice'; 

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if(token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <TopNav />
      <Routes />
    </div>
  );
}

export default App;
