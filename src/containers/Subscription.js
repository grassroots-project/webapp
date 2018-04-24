import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Container, Row, Col, FormText } from 'reactstrap'
import { injectIntl } from 'react-intl'
import ethjs from 'ethjs';
import firebase from 'firebase';

import SectionHeader from '../components/SectionHeader'

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  CONTRACT_GAS_PRICE,
  CONTRACT_GAS_LIMIT,
  CONTRACT_FEE,
  NETWORK_ID,
  CONTRACT_INTERVAL_TIME
} from '../constants'

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      transaction: null,
      hadTicket: false,
      web3: null,
      name: null,
      email: null,
      initialized: false,
      validNetwork: false,
      registrationAmount: 0,
      maxAttendee: 100,
      fee: CONTRACT_FEE
    }
  }

  componentDidMount() {
    this.checkWeb3IntervalId = setInterval(async () => {
      const newState = {}
      try {
        const web3 = window.web3
        newState.web3 = web3
        if (web3) {
          newState.validNetwork = (web3.version.network === NETWORK_ID)
          const eth = new ethjs(window.web3.currentProvider)
          const accounts = await eth.accounts()
          const wallet = accounts[0]
          newState.wallet = wallet
          if (wallet) {
            const Ticket = eth.contract(CONTRACT_ABI)
            const ticket = Ticket.at(CONTRACT_ADDRESS)
            const userIdResult = await ticket.userId(wallet)
            const userAmountResult = await ticket.userAmount()
            const maxAttendeeResult = await ticket.maxAttendees()
            const hadTicket = userIdResult[0] > 0
            newState.hadTicket = hadTicket
            newState.registrationAmount = userAmountResult[0].toNumber()
            newState.maxAttendee = maxAttendeeResult[0].toNumber()
          } else {
            newState.hadTicket = false
          }
        }
        newState.initialized = true
        this.checkWeb3IntervalId && this.setState({ ...this.state, ...newState })
      } catch (error) {
        newState.web3 = false
        newState.initialized = true
        this.checkWeb3IntervalId && this.setState({ ...this.state, ...newState })
      }
    }, CONTRACT_INTERVAL_TIME)
  }

  componentWillMount() {
    clearInterval(this.checkWeb3IntervalId)
    this.checkWeb3IntervalId = null
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onSend = async () => {
    const {name, email, wallet} = this.state;
    if (!name || !email) {
      // Add error message
      return
    }
    try {
      const eth = new ethjs(window.web3.currentProvider)
      const transaction = await eth.sendTransaction({
        from: this.state.wallet,
        to: CONTRACT_ADDRESS,
        value: ethjs.toWei(this.state.fee, 'ether'),
        gas: CONTRACT_GAS_LIMIT,
        gasPrice: CONTRACT_GAS_PRICE,
        data: '0x'
      })
      const userRef = firebase.database().ref('investors').push();
      await userRef.set({
        name,
        email,
        transaction,
        wallet
      })
      this.setState({ transaction })
    } catch (error) {
      // console.log('error', error)
    }
  }
  render() {
    const intl = this.props.intl
    return (
      <div>
        <SectionHeader>
          <h2>
            {intl.formatMessage({ id: 'Fund Subscription' })}
          </h2>
          <p>
            本次報名將使用智能合約 (Smart Contract) 作為報名機制，收取 0.015 ETH 作為活動費用。
          </p>
        </SectionHeader>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <div>
                {/* {this.state.initialized && this.renderAlert()} */}
              </div>
              <Form>
                <FormGroup>
                  <Label for='name'>{intl.formatMessage({ id: 'Name / Nickname' })}</Label>
                  <Input type='text' name='name' id='name' value={this.state.name || ''} onChange={this.onNameChange} />
                </FormGroup>
                <FormGroup>
                  <Label for='email'>{intl.formatMessage({ id: 'Email' })}</Label>
                  <Input type='email' name='email' id='email' value={this.state.email || ''} />
                </FormGroup>
                <FormGroup>
                  <Label for='share'>{intl.formatMessage({ id: 'Subscription Share' })}</Label>
                  <Input type='text' name='share' id='share' value={this.state.share || ''} />
                  <Label for='transfer_amount'>{intl.formatMessage({ id: 'Transfer Amount' })}</Label>
                  <Input type='text' name='transfer_amount' id='transfer_amount' value={this.state.transfer_amount || ''} />
                  <Label for='transfer_bank'>{intl.formatMessage({ id: 'Transfer Bank' })}</Label>
                  <Input type='text' name='transfer_bank' id='transfer_bank' value={this.state.transfer_bank || ''} />
                </FormGroup>
                <FormGroup>
                  <Label for='fee'>{intl.formatMessage({ id: 'Subscription Fee' })}</Label>
                  <Input type='number' name='fee' id='fee' defaultValue={this.state.fee} />
                  <FormText color="muted">
                    {intl.formatMessage({ id: 'feeDescription' })}
                  </FormText>
                </FormGroup>
                {
                  this.state.wallet && (
                    <FormGroup>
                      <Label for='wallet'>{intl.formatMessage({ id: 'Wallet Address' })}</Label>
                      <Input plaintext name='wallet' id='wallet'>{this.state.wallet}</Input>
                    </FormGroup>
                  )
                }
                {
                  this.state.initialized && (
                    <FormGroup>
                      <Label for="registration-amount">{intl.formatMessage({ id: 'Subscription Amount' })}</Label>
                      <Input plaintext name="registration-amount">{this.state.registrationAmount} / {this.state.maxAttendee}</Input>
                    </FormGroup>
                  )
                }
              </Form>
              <Button color='primary' onClick={this.onSend}>
                {intl.formatMessage({ id: 'Subscription With MetaMask' })}
              </Button>

            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Subscription);