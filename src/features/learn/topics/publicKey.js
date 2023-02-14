const publicKey = `
## Public Keys
An ECDSA public key is derived from a private key using elliptic curve math.

Bitcoin uses the [secp256k1 curve](https://en.bitcoin.it/wiki/Secp256k1) for its cryptography which has an equation of y^2 = x^3 + 7 and is "defined over a finite field of prime order".

The end result? secp256k1 looks like [a bunch of dots on a 2D graph](https://bitcoin.stackexchange.com/questions/21907/what-does-the-curve-used-in-bitcoin-secp256k1-look-like).

This curve is crucial to Bitcoin and generating public keys. The way this is done is that your private key (a random 256-bit number) is [multiplied by G](https://bitcoin.stackexchange.com/questions/102940/what-is-the-math-behind-bitcoins-elliptic-curve) (a predefined "generator point").

Elliptic curve multiplication is special because a public key cannot generate a private key.

The one-way relationship between public and private keys is why they call it "asymmetric cryptography".

"G", the generator point, is a point on the secp256k1 curve with an x and y coordinate pair, like so: (x, y). This means that when your private key is multiplied by G, the public key is also a coordinate pair, like so: (x, y).

Essentially, a public key is how people know where to send bitcoin without having the private key revealed.
`
export default publicKey