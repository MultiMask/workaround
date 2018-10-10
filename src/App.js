import React, { Component } from "react";
import styled from 'styled-components';
import "./App.css";
import tshirt from './TShirt.png';

import Eos from 'eosjs';
import Web3 from 'web3';

const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
const networkEOS = {
  protocol: 'http',
  blockchain: 'eos',
  host: '193.93.219.219',
  port: 8888,
  chainId,
};

let localWeb3,
  multiWeb3;

let identity,
  currentAccount;

class App extends Component {

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
    const btc = window.multiWeb.btc;
    
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
  };

  handleMeta = () => {
    this.sendByMetaMask();
  }

  async sendByMetaMask() {
    // eslint-disable-next-line
    localWeb3 = new Web3(web3.currentProvider);
    
    // eslint-disable-next-line
    const userAccount = await localWeb3.eth.getAccounts();
    // const userAccount = web3.eth.defaultAccount;

    localWeb3.eth.sendTransaction({
      from: userAccount, 
      to: '0x560e36b2d58f7e71499f58f5c9269B5A3989Be4C', 
      // eslint-disable-next-line
      value: web3.toWei(1, "ether")
    })
    .on("receipt", function(receipt) {
      console.log('get receipt', receipt);
    })
  }

  handleMulti = () => {
    this.sendByMulti();
  }

  async sendByMulti() {
    // eslint-disable-next-line
    multiWeb3 = new Web3(window.multiWeb.eth);

    // eslint-disable-next-line
    const userAccount = await multiWeb3.eth.getAccounts();
    // console.log(userAccount);
    // console.log(multiWeb3);

    multiWeb3.eth.sendTransaction({
      from: userAccount[0], 
      to: '0x560e36b2d58f7e71499f58f5c9269B5A3989Be4C', 
      // eslint-disable-next-line
      value: multiWeb3.utils.toWei('0.025', "ether")
    }, (error, txHash) => {
      console.log('callback');
      console.log('error', error);
      console.log('result', txHash);
    })
    // .on("receipt", function(receipt) {
    //   console.log('get receipt', receipt);
    // })
    // .then(txData => {
    //   console.log('after then', txData);
    // })
  }

  handleEOSScatter = () => {
    console.log('start eos scatter');

    // eslint-disable-next-line
    const eos = scatter.eos(networkEOS, Eos, {
        chainId: networkEOS.chainId,
        httpEndpoint: `http://${networkEOS.host}:${networkEOS.port}`
    }, 'http');

    // console.log(eos);

    // eslint-disable-next-line
    scatter.suggestNetwork(networkEOS)
        .then(x => {
          console.log('suggest network', x);
          // eslint-disable-next-line
          return scatter.getIdentity({ accounts: [networkEOS] })
        })
        .then(data => {
          identity = data;
          currentAccount = identity.accounts[0];
          console.log(data);

          // eslint-disable-next-line
          return scatter.authenticate();
        })
        .then(data => {
          console.log('auth > ', data);

          // eslint-disable-next-line
          return eos.transaction({
            actions: [
              {
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                  actor: currentAccount.name,
                  permission: currentAccount.authority
            }],
            data: {
              from: currentAccount.name,
              to: 'eosio',
              quantity: '0.1200 EOS',
              memo: ''
            }
              }
            ]
          });
        })
        .then(txHash => {
          console.log('tx hash', txHash);
        })
  }

  handleEOSMulti = () => {
    // eslint-disable-next-line
    const eos = window.multiWeb.eos(networkEOS, Eos, {
      chainId: networkEOS.chainId,
      httpEndpoint: `http://${networkEOS.host}:${networkEOS.port}`
    }, 'http');

    console.log(eos);
    return eos.transaction({
      actions: [
        {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: 'ducone',
            permission: 'active'
          }],
          data: {
            from: 'ducone',
            to: 'eosio',
            quantity: '0.1300 EOS',
            memo: ''
          }
        }
      ]
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
      <Wrapper>
        <Container>
          <Title>
            Demo
          </Title>
          <Content>
            <Tshirt src={tshirt} />
            <Description>
              <div>
                <h3>
                  T-Shirt with MultiMask Logo
                </h3>
                <div>
                  <p>
                    Total: 20$ (0.0031 BTC)
                  </p>
                </div>
              </div>
              <Item>
                <div>
                  <Btn onClick={this.handleBTC} disabled={!this.isValidData}>Buy</Btn>
                </div>
                {/* <div>
                  <Btn onClick={this.handleMeta} disabled={!this.isValidData}>ETH by MetaMask</Btn>
                </div> */}
                {/* <div>
                  <Btn onClick={this.handleMulti} disabled={!this.isValidData}>Buy</Btn>
                </div> */}
                {/* <div>
                  <Btn onClick={this.handleEOSScatter} disabled={!this.isValidData}>EOS by Scatter</Btn>
                </div>
                <div>
                  <Btn onClick={this.handleEOSMulti} disabled={!this.isValidData}>EOS by MultiMask</Btn>
                </div> */}
              </Item>
            </Description>
          </Content>
        </Container>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #BE93C5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Container = styled.div`
  width: 500px;
  background: #eee;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.35);
  border-radius: 10px;
  overflow: hidden;

  opacity: 0;
  transform: translateY(2.4rem);
  animation: showUp 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;

  padding-bottom: 40px;
`;

const Title = styled.h1`
  text-align: center;
  background: #ddd;
  margin: 0;
  padding: 15px 0 30px;
`;

const Item = styled.div`
  margin: 20px;
  text-align: center;
`;

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

const Tshirt = styled.img`
  max-height:300px;
  border: 1px solid #CCC;
`;

const Content = styled.div`
  display: flex;
`;

const Description = styled.div`
  margin-left: 20px;
`;