import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';

const LearnPage = () => {
  const navigate = useNavigate();

  const markdown = `# Learn Bitcoin Wallet \n ---
  ### The wallet that **helps you understand**
  ##### The topic of Bitcoin is vast: 
  - *Seperation* of money and state
  - Financial *freedom*
  - Digital *sovereignty*
  - Proof of work *consensus*
  - Blockchain \n
  This wallet focuses on how to *use* bitcoin and *understand* what is going on under the hood.
  ##### Some basic terms to understand:
  - **Wallet**: A tool to keep track of keys, addresses, and your balance of bitcoin.
  - **Address**: Your unique "ID" that people can send bitcoin to. Only the holder of the corresponding private key(s) can spend bitcoin spent to an address
  - **Key Pair**: Bitcoin uses elliptic curve cryptography which require a public and private key pair. This pair is the only way that you can spend your bitcoin
  - **Private Key**: A randomly generated 256 bit number (78 digits)
  - **Public Key**: Elliptic curve math is used to generate a public key from the private key. The function used is a one way function.\n
  If you still feel lost, follow along with the following steps.\n
  *Most terms in the wallet will have an "i" that can be clicked to learn more*
  ### Step-By-Step Guide to Get Started:
  *As you follow the guide there will be more instructions, or you can click "Show Guide" from the menu to see this page again.*\n
  ##### 1. Create a key pair by selecting the dropdown or clicking the "+ Key" button. 
  *A key pair consists of a private a public key pair*\n
  ##### 2. Create an address by selection the dropdown or clicking the "+ Address" button.
  *You will need a key pair before you can generate an address*\n
  ##### 3. Navigate to an address that you have created
  ##### 4. Fund your address by clicking the "Fund Address Button"
  *There is a **faucet** address that will send you 1 BTC when clicked*
  ##### 5. Your address now has bitcoin that can be spent using your private key
  ##### 6. Follow steps  1 and 2 to create another address with a new key pair
  ##### 7. Navigate to the address that has bitcoin available and click "Create Transaction"
  \n
  ### Congralations! You just spent bitcoin from one address to another!
  *Start with step 1, and you will be guided from there*\n
  ### Features For the Future:
  - New address types
  - Multi Signature Transactions
  - Lightning Network simulation`
  return (
    <Container>
      <Row>
        <Col xs={8}>
      <ReactMarkdown children={markdown}/>
        </Col>
        <Col xs={2}>
        <Button className='mt-5' onClick={() => navigate('/wallet')}>Navigate to Wallet</Button>
        </Col>

      </Row>
    </Container>
  );
}

export default LearnPage;
