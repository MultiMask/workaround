const bitcoin = require('bitcoinjs-lib') // version @3.3.2, ver4 won't work
const request = require('request-promise-native')
const net = process.env.NETWORK === 'testnet'
  ? bitcoin.networks.testnet
  : bitcoin.networks.bitcoin

const API = net === bitcoin.networks.testnet
  ? `https://test-insight.swap.online/insight-api`
  : `https://insight.bitpay.com/api`

const fetchUnspents = (address) =>
  request(`${API}/addr/${address}/utxo/`).then(JSON.parse)

const broadcastTx = (txRaw) =>
  request.post(`${API}/tx/send`, {
    json: true,
    body: {
      rawtx: txRaw,
    },
  })

const createSimpleSend = async (fetchUnspents, alice_pair, recipient_address/*, amount = 10*/) => {

  const tx = new bitcoin.TransactionBuilder(net)

  const alice_p2pkh = alice_pair.getAddress()
  const unspents = await fetchUnspents(alice_p2pkh)

  const fundValue     = 546 // dust
  const feeValue      = 5000
  const totalUnspent  = unspents.reduce((summ, { satoshis }) => summ + satoshis, 0)
  const skipValue     = totalUnspent - fundValue - feeValue

  if (totalUnspent < feeValue + fundValue) {
    throw new Error(`Total less than fee: ${totalUnspent} < ${feeValue} + ${fundValue}`)
  }

  unspents.forEach(({ txid, vout }) => tx.addInput(txid, vout, 0xfffffffe))

  const simple_send = [
    "6f6d6e69", // omni
    "0000",     // version
    "00000000001f", // 31 for Tether
    "000000003B9ACA00" // amount = 10 * 100 000 000 in HEX
  ].join('')

  const data = Buffer.from(simple_send, "hex")

  const omniOutput = bitcoin.script.compile([
    bitcoin.opcodes.OP_RETURN,
    // payload for OMNI PROTOCOL:
    data
  ])

  tx.addOutput(recipient_address, fundValue) // should be first!
  tx.addOutput(omniOutput, 0)

  tx.addOutput(alice_p2pkh, skipValue)

  tx.inputs.forEach((input, index) => {
    tx.sign(index, alice_pair)
  })

  return tx
}

// Construct tx
const alice = bitcoin.ECPair.fromWIF(process.env.ALICE_WIF, net)
const bobby = bitcoin.ECPair.makeRandom({ network: net })
const amount = null // not used

const omni_tx = createSimpleSend(fetchUnspents, alice, bobby.getAddress(), amount)

const auto_send = false

omni_tx.then(tx => {
  const txRaw = tx.buildIncomplete()

  console.log('hash', txRaw.getId())

  console.log(`"${txRaw.toHex()}"`)
  console.log(txRaw)

  if (auto_send) {
    broadcastTx(txRaw.toHex())
  }
})