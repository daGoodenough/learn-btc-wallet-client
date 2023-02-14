const key = `
## Key Pairs
A ECDSA (elliptic curve digital signature algorithm) key pair consists of a public and a private key.

First, the private key is generated.

From there, elliptic curve math is used to generate a public key.

Private keys are how you spend your bitcoin, and public keys are what you give to someone that wants to spend bitcoin to you.

The special thing about these key pairs is that the same public key will be derived from a specific private key, but a private key can never be derived from a public key.

For this reason, never expose your private key to the internet or to other humans, as you risk your bitcoin being stolen.

##### Get started by creating a key pair. From there you can start to learn how transactions work.
`;

export default key;