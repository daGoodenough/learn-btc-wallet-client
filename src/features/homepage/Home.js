import { Container } from 'react-bootstrap';
import { useState } from 'react';

import Banner from './Banner';
import FeaturesNav from './FeaturesNav';
import WalletsList from './WalletsList';
import KeysList from './KeysList';
import TransactionsList from './TransactionsList';
import ButtonsCreate from './ButtonsCreate';

const Home = () => {
  const [activeTab, setActiveTab] = useState('addresses');

  const handleNavTabChange = (newTab) => {
    setActiveTab(newTab);
  }

  return (
    <>
      <Container>
        <Banner />
        <FeaturesNav 
          activeTab={activeTab}
          changeNavTab={handleNavTabChange}
        />
        {activeTab === 'addresses' && <WalletsList />}
        {activeTab === 'keys' && <KeysList />}
        {activeTab === 'transactions' && <TransactionsList />}
        <ButtonsCreate />
      </Container>
    </>
  );
}

export default Home;
