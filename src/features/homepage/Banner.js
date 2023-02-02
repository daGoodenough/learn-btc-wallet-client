import { Image } from "react-bootstrap";

const Banner = () => {
  return (
    <header>
      <h1>Welcome to the Bitcoin wallet that <strong>helps you understand</strong>!</h1>
      <h2>Learn the difference:</h2>
      <h3>keys and wallets</h3>
      <h3>address formats</h3>
      <h2>Learn to construct collaborative multi-sig transactions</h2>
      <button>Click Here to Create an Account</button>
      <h4>Logging in will help you keep track of your learning journey</h4>
      <button>Click Here to Continue as a Guest</button>
      <h4>Guest data does not get stored</h4>
    </header>
  );
}

export default Banner;
