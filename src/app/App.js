import Routes from './Routes';
import TopNav from './TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../features/auth/authSlice';
import { fetchUserKeys } from '../features/keys/keySlice';
import { fetchUserWallets } from '../features/wallets/walletSlice';
import LearnPopUp from '../features/learn/LearnPopUp';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
      dispatch(fetchUserWallets());
      dispatch(fetchUserKeys())
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <TopNav />
      <Routes />
      <LearnPopUp />
      <footer>
        <a target="_blank" href="https://icons8.com/icon/89496/school" rel="noreferrer">School</a>
        icon by <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
