const Engine = require('./eth.js')

const engine = new Engine()

const mnemonic = engine.generateMnemonic()
console.log('Mnemonic phrase:', mnemonic)

const seed = engine.getSeedFromMnemonic(mnemonic)
console.log('Seed :', seed.toString('hex')) 

const privKey = engine.getPrivKeyFromSeed(seed)
console.log('Private key :', privKey.toString('hex'))

const address = engine.getEthereumAddress(privKey)
console.log('Address :', address)

