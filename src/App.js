import Payment from './payment';
import React, { Component } from "react";
import styled from 'styled-components';
import tshirt from './TShirt.png';
import "./App.css";
import "antd/dist/antd.css";
import { Modal } from 'antd';
import { Steps, Icon } from 'antd';
const Step = Steps.Step;


class App extends Component {

  state = {
    showModal: false,
    step: 0
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      showModal: !state.showModal
    }))
  }

  next = () => {
    this.setState({step: this.state.step + 1});
  }

  prev = () => {
    this.setState({step: this.state.step - 1});
  }

  render() {
    const {step} = this.state;

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
                <Btn onClick={this.toggleModal}>Buy</Btn>
              </Item>
            </Description>
          </Content>
        </Container>

        <Modal
          title="Payment form"
          visible={this.state.showModal}
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
        >
          <Steps current={step}>
            <Step status={getStepStatus(step, 0)} title="Verification" icon={<Icon type="solution" />} />
            <Step status={getStepStatus(step, 1)} title="Pay" icon={<Icon type="dollar" />} />
            <Step status={getStepStatus(step, 2)} title="Done" icon={<Icon type="smile-o" />} />
          </Steps>

        <TabContent visible={this.state.step === 0}>
          <div>
            <input type="text" placeholder="Name:"/>
            <input type="text" placeholder="Address:"/>
            <input type="text" placeholder="Email:"/>
          </div>
          <Actions>
            <Btn onClick={this.next}>Next</Btn>
          </Actions>
        </TabContent>

        <TabContent visible={this.state.step === 1}>
          <div>
            <h2>
              Input card data:
            </h2>

            <input type="text" placeholder="Card number" name="cardnumber" />
            <input type="text" placeholder="Holder name" name="holdername" /> 
            <input type="text" placeholder="Mounth" name="month"/>
            <input type="text" placeholder="Yaer" name="year"/>
            <input type="text" placeholder="CVV" name="cvv"/>
            
          </div>
          <Actions>
            <Btn onClick={this.prev}>Prev</Btn>
            <Btn onClick={this.next}>Next</Btn>
          </Actions>
        </TabContent>

        <TabContent visible={this.state.step === 2}>
          <Payment />
          <Actions>
              <Btn onClick={this.prev}>Prev</Btn>
            </Actions>
        </TabContent>

        </Modal>
      </Wrapper>
    );
  }
}

export default App;

const getStepStatus = (step: number, current: number): string => {
  if (step > current) {
    return 'finish';
  }

  if (step === current) {
    return 'process';
  }

  return 'wait';
}

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

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabContent = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
`;