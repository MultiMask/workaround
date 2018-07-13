import React, { Component } from "react";
import styled from 'styled-components';
import "./App.css";

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

  handleCreateTX = () => {
    const tx = {
      network: 'bitcoin',
      to: '1MK2jqUQKnVzRLC79V18pdb3GM3CeAAqG',
      amount: 2000 * 1e8,
      data: "payload"
    };

    window.multiWeb.sendTransaction(tx);
  };

  get isValidData() {
    return true;
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>
            MultiMask Test
          </Title>
          <Item>
            <Btn onClick={this.handleCreateTX} disabled={!this.isValidData}>Call</Btn>
          </Item>
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
  height: 400px;
  background: #eee;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.35);
  border-radius: 10px;
  overflow: hidden;

  opacity: 0;
  transform: translateY(2.4rem);
  animation: showUp 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;

const Title = styled.h1`
  text-align: center;
  background: #ddd;
  margin: 0;
  padding: 15px 0 30px;
  margin-bottom: 40px;
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