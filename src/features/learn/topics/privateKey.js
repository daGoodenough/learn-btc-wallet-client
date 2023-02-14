const privateKey = `# Private Keys
The first step to using Bitcoin is to generate a private key which is simply a random 256-bit number (256 binary characters or 64 hexadecimal characters).

Here is an example of a base 16 (hexadecimal) private key: 90446e7391204aec07e92f234fca5d7ed4303c6676f2a1481c4d51c36591b890

It's just a really big number.

Your private key is a number so large it would take 9.03 x 10^33 years to guess it **if** you could make 1,000 guesses / second.

To put that into perspective, the universe is *only* 1.38 x 10^10 years old.

The reason this number needs to be so secure is that in Bitcoin it is used to give you access to your funds. A transaction gets "locked" with your public key, and then your private key is required to "unlock" the funds held in that transaction.

#### **NOTE** If someone has access to your private key, then they can spend your bitcoin.
`

export default privateKey;