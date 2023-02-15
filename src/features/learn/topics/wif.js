const wif = `
## Wallet Import Format (WIF)
WIF is a way of encoding a bitcoin private key so that it is more readable and has an added checksum for assurance.

You can read about the encoding [here](https://en.bitcoin.it/wiki/Wallet_import_format)

A WIF string is a base 58 check encoded private key.

Base 58 check encoding involves prefixing the private key with a version byte (0x80 for mainnet and 0xef for testnet), and if the key is compressed adding a suffix of 01.

The end result is that you have a checksum so that you can verify the WIF string has no errors. The hope is that you are able to import the correct private key.

I guess I should mention what it means to import a private key. Like I have said before, private keys are simply big random numbers that unlock all your bitcoin. Wallets help manage your private key.

WIF makes it easy to migrate private keys from one wallet to another.

I also mentioned that to convert a private key into its WIF you need to know if the key is compressed.

Private keys are just big numbers, so they cannot be compressed.

A "compressed private key" means that the corresponding public key is compressed.

Compressed and uncompressed public keys create different addresses, so it is important to keep track of which you are using so that the wallet software can piece together the history of transactions relating to an address.

To sum it up, WIF (stands for Wallet Import Format) is a way of encoding a private key with the network version, a checksum, and if the private key is used for a compressed/uncompressed public key.
`;

export default wif;