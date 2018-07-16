const etherscanApiKey = 'IHCAU7EB6GCS37D4B8BPN78M3BUVQMWX13'
const chain = 'rinkeby'
const timeout = '3000' 

//etherscanApiKey - (optional) Your Etherscan APIkey https://etherscan.io/myapikey
//chain - (optional) Testnet chain keys [ropsten, rinkeby, kovan]
//timeout - (optional) Timeout in milliseconds for requests, default 10000
 
var api = require('etherscan-api').init(etherscanApiKey, chain, timeout); 

api.proxy.eth_gasPrice().then( gasPrice => console.log(parseInt(gasPrice.result,16))) 
