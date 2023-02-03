import Routes from './Routes';
import TopNav from './TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../features/auth/authSlice';
import { fetchUserKeys } from '../features/keys/keySlice';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { keys } = useSelector((state) => state);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
      dispatch(fetchUserKeys())
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserKeys());
    }
  }, []);

  return (
    <div className="App">
      <TopNav />
      <Routes />
    </div>
  );
}

export default App;
