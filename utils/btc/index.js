const inspect = require('util').inspect;

const log = x => console.log(inspect(x, true, 10, true));

const explorer = require('./explorer');
const engine = require('./engine');

const mnemonic = '';

// BTC TEST
// const wallet = engine.getWallet(mnemonic, engine.network.bitcoin.test, true, 0, 0);
// const address = engine.getAddressFromKeys(wallet);
// console.log(address);
// 2MyxprDPvEHy32UpdwSfEmDe6jb5A9xHxyZ
// mmfnJyM1NTNSMFCcMJxfo5oJYSsUaq78n3
// miXLnYbxygnavBeHeX6BWAnV6viNMa3Zt5


// explorer.getBalance(address, explorer.coinsigns.BTCTEST)
//   .then(result => {
//     log('balance');
//     log(result.data);

//     return explorer.getUnspentTX(address, explorer.coinsigns.BTCTEST)
//   })
//   .then( outs => {
//     const inputs = outs.data.data.txs;
//     log(inputs);

//     const tx = engine.getTxHash(wallet, inputs, 'miXLnYbxygnavBeHeX6BWAnV6viNMa3Zt5', 20000, 5000);
//     log(tx);
//     log('push');

//     return explorer.pushTX({ tx_hex: tx.hex }, explorer.coinsigns.BTCTEST);
//   })
//   .then(result => {
//     log(result.data);
//   })


// LTC TEST

// const wallet = engine.getWallet(mnemonic, engine.network.litecoin.test, false, 0, 0);
// const address = engine.getAddressFromKeys(wallet);
// console.log(address);
// // mmfnJyM1NTNSMFCcMJxfo5oJYSsUaq78n3
// // miXLnYbxygnavBeHeX6BWAnV6viNMa3Zt5


// explorer.getBalance(address, explorer.coinsigns.LTCTEST)
//   .then(result => {
//     log('balance');
//     log(result.data);

//     return explorer.getUnspentTX(address, explorer.coinsigns.LTCTEST)
//   })
//   .then( outs => {
//     const inputs = outs.data.data.txs;
//     log(inputs);

//     const tx = engine.getTxHash(wallet, inputs, 'miXLnYbxygnavBeHeX6BWAnV6viNMa3Zt5', 20000, 5000);
//     log(tx);
//     log('push');

//     return explorer.pushTX({ tx_hex: tx.hex }, explorer.coinsigns.LTCTEST);
//   })
//   .then(result => {
//     log(result.data);
//   })


// DOGE TEST

// const wallet = engine.getWallet(mnemonic, engine.network.dogecoin.main, false, 3, 0);
// const address = engine.getAddressFromKeys(wallet);
// console.log(address);
// myKRcMWFu4PeKCCoPN9Qjz25WySaeo3Qh1
// mqb5KN93memqKuJZggZb2UnMHfePb9aHCw

// explorer.getBalance(address, explorer.coinsigns.DOGETEST)
//   .then(result => {
//     log('balance');
//     log(result.data);

//     return explorer.getUnspentTX(address, explorer.coinsigns.DOGETEST)
//   })
//   .then( outs => {
//     const inputs = outs.data.data.txs;
//     log(inputs);

//     const tx = engine.getTxHash(wallet, inputs, 'mqb5KN93memqKuJZggZb2UnMHfePb9aHCw', 20000, 5000);
//     log(tx);
//     log('push');

//     return explorer.pushTX({ tx_hex: tx.hex }, explorer.coinsigns.DOGETEST);
//   })
//   .then(result => {
//     log(result.data);
//   })