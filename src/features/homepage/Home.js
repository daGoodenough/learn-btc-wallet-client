import { Container } from 'react-bootstrap';

import Banner from './Banner';
import WalletsList from './WalletsList';

const Home = () => {
  return (
    <>
      <Container>
        <Banner />
        <WalletsList />
      </Container>
    </>
  );
}

export default Home;
