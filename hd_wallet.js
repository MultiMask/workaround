const bcrypt = require('bcrypt')
const bip39 = require('bip39')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')


class Engine {


    ////////////////////////////////////////////////////////////////////
    // Helper functions for passwords
    ////////////////////////////////////////////////////////////////////

    generatePasswordHash(password) {
        const saltRounds = 10
        return bcrypt.hashSync(password, saltRounds)
    }

    comparePasswordWithHash(password, hash) {
        return bcrypt.compareSync(password, hash)
    }


    ////////////////////////////////////////////////////////////////////
    // Generating related functions
    ////////////////////////////////////////////////////////////////////

    generateMnemonic() {
        return bip39.generateMnemonic()
    }

    getSeedFromMnemonic(mnemonic) {
        return bip39.mnemonicToSeed(mnemonic)
    }


    ////////////////////////////////////////////////////////////////////
    // Master keys related functions
    // Require: seed
    ////////////////////////////////////////////////////////////////////

    getMasterPrivateExtendedKey(seed) {
        return hdkey.fromMasterSeed(seed).privateExtendedKey
    }

    getMasterPublicExtendedKey(seed) {
        return hdkey.fromMasterSeed(seed).publicExtendedKey
    }

    getMasterPrivateKey(seed) {
        return hdkey.fromMasterSeed(seed).privateKey
    }

    getMasterPublicKey(seed) {
        return hdkey.fromMasterSeed(seed).publicKey
    }


    ////////////////////////////////////////////////////////////////////
    // Ethereum related functions
    // Require: seed
    ////////////////////////////////////////////////////////////////////

    getEthereumPrivateExtendedKey(seed) {
        const root = hdkey.fromMasterSeed(seed)
        const derived = root.derive(`m/44'/60'/0'`)
        return derived.privateExtendedKey
    }

    getEthereumPublicExtendedKey(seed) {
        const root = hdkey.fromMasterSeed(seed)
        const derived = root.derive(`m/44'/60'/0'`)
        return derived.publicExtendedKey
    }


    ////////////////////////////////////////////////////////////////////
    // Ethereum accounts related functions
    // Require: ethereum extended private key at HD path /m/44'/60'/0'
    ////////////////////////////////////////////////////////////////////

    // ethereumPrivateExtendedKey - private extended key at HD path /m/44'/60'/0'
    // index - integer index of derived account from 0
    // returns account private key as buffer
    getEthereumAccountPrivateKey(ethereumPrivateExtendedKey, index) {
        const ethereumRoot = hdkey.fromExtendedKey(ethereumPrivateExtendedKey)
        return ethereumRoot.deriveChild('0').deriveChild(index.toString()).privateKey
    }


    ////////////////////////////////////////////////////////////////////
    // Ethereum accounts related functions
    // Require: ethereum extended public key at HD path /m/44'/60'/0'
    ////////////////////////////////////////////////////////////////////

    // ethereumPublicExtendedKey - public extended key at HD path /m/44'/60'/0'
    // index - integer index of derived account from 0
    // returns account public key as buffer
    getEthereumAccountPublicKey(ethereumPublicExtendedKey, index) {
        const ethereumRoot = hdkey.fromExtendedKey(ethereumPublicExtendedKey)
        return ethereumRoot.deriveChild('0').deriveChild(index.toString()).publicKey
    }

    // ethereumPublicExtendedKey - public extended key at HD path /m/44'/60'/0'
    // index - integer index of derived account from 0
    // returns account address key as buffer
    getEthereumAccountAddress(ethereumPublicExtendedKey, index) {
        const ethereumPublicKey = this.getEthereumAccountPublicKey(ethereumPublicExtendedKey, index)
        return ethUtil.pubToAddress(ethereumPublicKey, true)
    }

    // address - ethereum address as string
    // returns checksum of address as string
    getEthereumChecksumAddress(address) {
        return ethUtil.toChecksumAddress(address)
    }
}

module.exports = Engine
