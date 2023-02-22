const transaction = `
# Transactions
---
A transaction is a way of re-writing the state of the ledger.

Bitcoin's blockchain holds a record of all past transactions, spent and unspent.

When creating a transaction, you are selecting bitcoin that has been locked to your address, but unspent by you (AKA unspent transaction outputs or UTXOs).

Each one of these UTXOs has specific conditions (locking scripts)  that must be met in order to spend them.

Most commonly, to spend a UTXO you will need to provide proof that you are the owner of the address by "signing" the transaction.

Signing is a cryptographic way of proving the Bitcoin you are spending is yours.

Essentially, when you create a transaction you are signing an output as the input to your transaction, and then adding locking scripts to outputs of your own to the addresses you want to spend to.

For example:

1. Alice sends Bob 1 bitcoin.

2. Bob now has a UTXO with his name on it.

3. Bob starts to construct a transaction to Carol by using his private key to sign (unlock) the transaction from Alice.

4. The signed UTXO becomes the input (of 1 BTC) in the transaction to Carol.

5. Bob adds an output of 0.5 bitcoin that only Carol can spend.

6. Bob adds a second output of 0.49 bitcoin that is locked to his address.

7. The remaining bitcoin ( 1 - ( 0.5 + 0.49 ) ) becomes the transaction fee.

By creating a transaction, the set of unspent transactions (UTXOs) is changed. The output you spent is destroyed, and the outputs you created are added to the set.

### Follow along with the tutorial to create a transaction and see for yourself!
`;

export default transaction;