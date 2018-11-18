const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');

const toSatoshi = str => Math.floor(parseFloat(str) * 1e8);

module.exports = {
  getWallet: (seed, network, segwit, coin = 0, index = 0) => {
    const path = `m/44'/${coin}'/0'/0/${index}`;

    return {
      keys: bitcoin.bip32.fromSeed(bip39.mnemonicToSeed(seed), network).derivePath(path),
      segwit: segwit != undefined ? segwit : false
    }
  },
  getAddressFromKeys: (wallet) => {
    if (wallet.segwit === true) {
      const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network })
      return bitcoin.payments.p2sh({ redeem: p2wpkh, network: wallet.keys.network }).address
    } else {
        return bitcoin.payments.p2pkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network }).address;
    }
  },
  getTxHash: (wallet, inputs, to, amount, fee) => {
    let pay2
    if (wallet.segwit === true) {
        const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network })
        pay2 = bitcoin.payments.p2sh({ redeem: p2wpkh, network: wallet.keys.network })
    } else {
        pay2 = bitcoin.payments.p2pkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network })
    }

    const txb = new bitcoin.TransactionBuilder(wallet.keys.network);
    // txb.setVersion(version)

    let total = 0
    inputs.forEach(element => {
        txb.addInput(element.txid, element.output_no)
        total += toSatoshi(element.value)
    });

    txb.addOutput(to, amount)
    txb.addOutput(pay2.address, total - amount - fee)

    inputs.forEach((element, index) => {
        if (wallet.segwit === true) {
            txb.sign(index, wallet.keys, pay2.redeem.output, null, toSatoshi(element.value))
        } else {
            txb.sign(index, wallet.keys)
        }
    });

    const t = txb.build()

    return {
        "id": t.getId(),
        "hex": t.toHex()
    }
  },
  network: {
    dogecoin: {
        main: {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bip32: {
                public: 0x02facafd,
                private: 0x02fac398
            },
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            wif: 0x9e
        },
        test: bitcoin.networks.testnet
    },
    litecoin: {
        main: {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bip32: {
              public: 0x019da462,
              private: 0x019d9cfe
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0
        },
        test: bitcoin.networks.testnet
    },
    bitcoin: {
        main: bitcoin.networks.bitcoin,
        test: bitcoin.networks.testnet
    }
  },
}