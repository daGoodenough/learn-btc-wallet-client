import Routes from './Routes';
import TopNav from './TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../features/auth/authSlice'; 

function App() {
  const dispatch = useDispatch();
  const {token, username} = useSelector((state) => state.auth);

  useEffect(() => {
    if(token && !username) {
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
