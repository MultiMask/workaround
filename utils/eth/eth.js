const ethUtil = require('ethereumjs-util')
const bip39 = require('bip39')
const keythereum = require('keythereum')
const ethTx = require('ethereumjs-tx')

class Engine {

    ////////////////////////////////////////////////////////////////////
    // Generating related functions
    ////////////////////////////////////////////////////////////////////

    generateMnemonic() {
        return bip39.generateMnemonic()
    }

    getSeedFromMnemonic(mnemonic) {
        return bip39.mnemonicToSeed(mnemonic)
    }

    getPrivKeyFromSeed(seed) {
        return Buffer.from(ethUtil.keccak(seed), 'hex')
    }

    getEthereumAddress(PrivKey) {
        return keythereum.privateKeyToAddress(PrivKey)
    }

    signEthTx(privKey, amount, receiverAddress, txID) {
        let senderAddress = getEthereumAddress(privKey)

        const tx = new ethTx({
            to: receiverAddress,
            from: senderAddress,
            value: Web3.utils.toHex(amount),
            gasLimit: Web3.utils.toHex(Web3.utils.toBN('21000')),
            gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
            nonce: Web3.utils.toHex(0),
            data: Web3.utils.toHex(txID)
        })
        tx.sign(privKey)
        const txSerialized = '0x' + tx.serialize().toString('hex')
        return txSerialized
    }

    sendERC20Tx(privKey, amount, tokenAbi, tokenAddress, receiverAddress) {
        const senderAddress = getEthereumAddress(privKey)
        const contract = new web3.eth.Contract(tokenAbi, tokenAddress)
        const bytecode = contract.methods.transfer(receiverAddress, amount).encodeABI()
        const tx = new ethTx({
            to: tokenAddress,
            from: senderAddress,
            value: Web3.utils.toHex(amount),
            gasLimit: Web3.utils.toHex(Web3.utils.toBN('75000')),
            gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
            nonce: Web3.utils.toHex(0),
            data: bytecode
        })
        tx.sign(options.senderPrivateKey)
        const txSerialized = '0x' + tx.serialize().toString('hex')
        return txSerialized
    }

}

module.exports = Engine