const inspect = require('util').inspect;
const axios = require('axios');
const log = x => console.log(inspect(x, true, 10, true));

const Explorer = {
  getBalance: (address, network) => {
    return axios.get(`https://chain.so/api/v2/get_address_balance/${network}/${address}`)
  },
  
  getUnspentTX: (address, network) => {
    return axios.get(`https://chain.so/api/v2/get_tx_unspent/${network}/${address}`)
  },

  pushTX: (tx, network) => {
    log(`https://chain.so/api/v2/send_tx/${network}`);
    return axios.post(`https://chain.so/api/v2/send_tx/${network}`, tx)
  },

  coinsigns: {
    BTC: 'BTC',
    BTCTEST: 'BTCTEST',
    DOGE: 'DOGE',
    DOGETEST: 'DOGETEST',
    LTC: 'LTC',
    LTCTEST: 'LTCTEST',
  }
}

module.exports = Explorer;