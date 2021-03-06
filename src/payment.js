import React, { Component } from "react";
import styled from 'styled-components';

import Eos from 'eosjs';
import Web3 from 'web3';

const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
const networkEOS = {
  protocol: 'http',
  blockchain: 'eos',
  host: 'jungle.cryptolions.io',
  port: 18888,
  chainId,
};

let localWeb3,
  web3;

let identity,
  currentAccount;

class Payment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      secret: '',
      amount: ''
    }
  }

  handleInput = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleBTC = () => {
    const btc = window.crypto3.btc;
    
    btc.getAccounts()
      .then(accounts => {

        const tx = {
          from: accounts[0],
          to: 'my51mavwxjFgmvu69peTJ9rjgEW9drtGjW',
          amount: 0.0031,
          data: 'afe023ac-3ced-459d-9915-16e8474467cc'
        };
    
        return btc.send(tx);
      })
      .then(result => {
        console.log('tx result', result);
      })
      .catch(error => {
        console.error(error);
      })
  };

  handleMulti = () => {
    this.sendByMulti();
  }

  async sendByMulti() {
    // eslint-disable-next-line
    web3 = new Web3(window.crypto3.eth.getProvider(3));
    
    // eslint-disable-next-line
    const userAccount = await web3.eth.getAccounts();

    // eslint-disable-next-line
    web3.eth.sendTransaction({
      from: userAccount[0], 
      to: '0xc64cea908a2734bdde3e8e14f6a0b47d6c28004a', 
      // eslint-disable-next-line
      value: web3.utils.toWei('0.00025', "ether")
    }, (error, txHash) => {
      console.log('error', error);
      console.log('result', txHash);
    })
  }

  handleEOSMulti = () => {
    // eslint-disable-next-line
    const crypto3 = window.crypto3;
    const eos = crypto3.eos.getEos(networkEOS, Eos, {
      chainId: networkEOS.chainId,
      httpEndpoint: `http://${networkEOS.host}:${networkEOS.port}`
    }, 'http');

    crypto3.eos.getIdentity(crypto3.eos.JUNGLE)
      .then(res => {
        const currentUser = res.accounts[0];

        const transData = {
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [{
                actor: currentUser.name,
                permission: currentUser.authority
              }],
              data: {
                from: currentUser.name,
                to: 'eosio',
                quantity: '0.1300 EOS',
                memo: ''
              }
            }
          ]
        };

        return eos.transaction(transData);
      })
      .then(txHash => {
        console.log('tx hash', txHash);
      })
  }

  get isValidData() {
    return true;
  }

  render() {
    return (
      <div>
        <div>
          <Btn onClick={this.handleBTC} disabled={!this.isValidData}>Buy on BTC</Btn>
        </div>
        <div>
          <Btn onClick={this.handleMulti} disabled={!this.isValidData}>Buy on ETH</Btn>
        </div>
        <div>
          <Btn onClick={this.handleEOSMulti} disabled={!this.isValidData}>Buy on EOS</Btn>
        </div>
      </div>
    );
  }
}

export default Payment;

const Btn = styled.button`
  margin-top: 30px;
  width: 200px;
  height: 40px;

  color: white;
  font-size: 18px;

  border: none;
  border-radius: 5px;
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  background: ${props => props.disabled ? '#bbb' : 'linear-gradient(to right, #734b6d, #42275a)'};
`;
