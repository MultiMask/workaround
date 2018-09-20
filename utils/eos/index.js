const inspect = require('util').inspect;
const Eos = require('eosjs');
const {ecc, Fcbuffer} = Eos.modules;

async function init() {
  // Create Private Key
  // const privateKey = await ecc.randomKey();
  const privateKey = '5JUebM8a8Rd29zcppXMCp5N1MkVjysuDW3HJHgWJ3APcmNuU2LH';
  let public,
    account;

  const chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
  };

  // Create instance Eosjs
  const eos = Eos({
    keyProvider: privateKey,
    httpEndpoint: 'http://193.93.219.219:8888',
    chainId: chain.jungle,
  });

  console.log(' -- Interface');
  // console.log(eos);

  // Network info
  console.log(' -- NETWORK INFO');
  const info = await eos.getInfo({});  
  console.log(info);

  // Private key to Public key
  console.log(' -- 1.1. Public Key')
  public = ecc.privateToPublic(privateKey);
  console.log(public);

  // // Find accounts by public key
  console.log(' -- 1.3. Account on this key')
  const accounts = await eos.getKeyAccounts({ public_key: public});
  account = accounts && accounts.account_names ? accounts.account_names[0] : null;
  console.log(account);


  // Balance
  console.log(' -- 2.1. Balance');
  const code = 'eosio.token';
  const table = 'accounts';
  const contractToken = await eos.contract(code);
  const balance = await eos.getTableRows({
    json: true,
    code,
    scope: account,
    table,
    limit: 5000
  });
  console.log(balance);

  console.log(' -- 2.2. Get Resources');
  const accountInfo = await eos.getAccount(account);
  console.log(inspect(accountInfo, false, 10, true));

  console.log(' -- 2.3.1. Buy RAM');
  // const buyram = await eos.buyrambytes({
  //   payer: account,
  //   receiver: account,
  //   bytes: 1000
  // });
  // console.log(buyram);

  console.log(' -- 2.3.2. Buy CPU & NET');
  // const buycpu = await eos.delegatebw({
  //   from: account,
  //   receiver: account,
  //   stake_net_quantity: "110.0000 EOS",
  //   stake_cpu_quantity: "110.0000 EOS",
  //   transfer: 0
  // });
  // console.log(buycpu);

  console.log(' -- 2.3.4. Sell CPU & NET');
  // const sellcpu = await eos.undelegatebw({
  //   from: account,
  //   receiver: account,
  //   unstake_net_quantity: "50.0000 EOS",
  //   unstake_cpu_quantity: "50.0000 EOS",
  // });
  // console.log(sellcpu);

  console.log(' -- 3.1. Send transfer');
  const tr = await eos.transfer(account, 'eosio', '0.1000 EOS', '');
  console.log(tr);
}

init();