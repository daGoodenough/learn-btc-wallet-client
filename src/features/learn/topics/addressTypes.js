export default `
  # Address Types
  ---
  There are quite a few types of addresses.

  ### Legacy

  **Pay to Pub Key Hash (p2pkh)**
  - the public key is hashed in a specific way, then Base58 Check encoded.

  **Pay to Script Hash (p2sh)**
  - A script is hashed then Base58 Check encoded.

  **Pay to Multi Sig (p2ms)**
  - Up to 3 keys can create a multi-sig transaction (there is no address format)
  - Preferred to wrap p2ms in a p2sh address

  ### Segregated Witness (Seg-Wit)

  **Pay to Witness Pub Key Hash (p2wpkh)**

  **Pay to Witness Script Hash (p2wsh)**
`;