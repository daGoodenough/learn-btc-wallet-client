const topics = {
  privateKey:
    `# Private Keys
    A private key is a random number and if it is really long then this will look like this
    And then this is another line
    `,
  publicKey: `
  An ECDSA public key is derived from a private key using elliptic curve math.

Bitcoin uses the secp256k1 curve for its cryptography which has an equation of y^2 = x^3 + 7 and is "defined over a finite field of prime order".
https://lnkd.in/gAWxWD8c

The end result? secp256k1 looks like a bunch of dots on a 2D graph.
https://lnkd.in/gHt5itFH

This curve is crucial to Bitcoin and generating public keys. The way this is done is that your private key (a random 256-bit number) is multiplied by G (a predefined "generator point").
https://lnkd.in/gqutnCwD

Elliptic curve multiplication is special because a public key cannot generate a private key.

The one-way relationship between public and private keys is why they call it "asymmetric cryptography".

"G", the generator point, is a point on the secp256k1 curve with an x and y coordinate pair, like so: (x, y). This means that when your private key is multiplied by G, the public key is also a coordinate pair, like so: (x, y).

There are two ways to represent your public keys.

The first is "uncompressed" which is just the x value concatenated with the y value and prefixed by '04' resulting in a 520-bit number (130 hexadecimal characters).

The second is, you guessed it, "compressed". We know the equation of the curve our point is on, so if we have x we can solve for y. To solve the equation and find the y value we need to know x and whether y is positive or negative.

When you see these points in hexadecimal format, they are binary representations, so if y is a positive value, then the y value we see will be even and if y represents a negative value it will be odd.

Armed with this knowledge we can easily construct a compressed public key. We simply prefix the x value with an additional byte to signify the parity of y.

If y is even the prefix is '02', and '03' for odd.

To recap:

A public key is derived from a private key through a one-way math problem and represents an x and a y value on the secp256k1 curve.

An uncompressed public key is of form '04' x y.

A compressed public key is of the form '02'x if y is even and '03'x if y is odd.
  `,
  intro: 
  `# Learn Bitcoin Wallet \n ---
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
  - Lightning Network simulation
  `,
  address: '',
  key: '',
  wallet: '',
  transaction: '',
  regtest: 
  `## Regtest Mode
  Bitcoin nodes are a program running on your computer, and they can be configured to run on different networks:\n
  - **Mainnet** is where all the Proof of Work (POW) is being done, and where bitcoin has real-world value.\n
  - **Testnet** is a network made up mostly of developers, but functions the same as mainnet. The key difference is that there is significatnly less POW on testnet.
  - **Regtest** is once step simpler than testnet. This mode allows for more control of the way that the node runs.
  ### *In short*, the bitcoin used on this wallet are for learning purposes only and have no real world value.
  `
};

export default topics