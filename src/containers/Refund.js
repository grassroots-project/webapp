import Eth from 'ethjs'
import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { injectIntl } from 'react-intl'
import { Container, Row, Col } from 'reactstrap'
import SectionHeader from '../components/SectionHeader'
import AlertHelper from '../components/AlertHelper'
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  CONTRACT_GAS_LIMIT,
  CONTRACT_GAS_PRICE,
  NETWORK_ID,
  CONTRACT_INTERVAL_TIME,
} from '../constants'


class Refund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: true,
      wallet: '',
      transaction: '',
      hadTicket: false,
      initialized: false,
      attended: false,
      validNetwork: false
    }
  }

  componentDidMount() {

    this.checkWeb3IntervalId = setInterval(async () => {
      const newState = {}
      try {
        const web3 = window.web3
        newState.web3 = web3
        if (web3) {
          const networkId = web3.version.network
          newState.validNetwork = (networkId === NETWORK_ID)
          const eth = new Eth(window.web3.currentProvider)
          const accounts = await eth.accounts()
          const wallet = accounts[0]
          newState.wallet = wallet
          if (wallet) {
            const Ticket = eth.contract(CONTRACT_ABI)
            const ticket = Ticket.at(CONTRACT_ADDRESS)
            const userIdResult = await ticket.userId(wallet)
            const userId = userIdResult[0]
            const hadTicket = userIdResult[0] > 0
            newState.hadTicket = hadTicket
            const attended = await ticket.isAttend(userId)
            newState.attended = attended[0]
          } else {
            newState.hadTicket = false
            newState.attended = false
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

  componentWillUnmount() {
    clearInterval(this.checkWeb3IntervalId)
    this.checkWeb3IntervalId = null
  }

  onRefund = async () => {
    let eth = new Eth(window.web3.currentProvider)
    const transaction = await eth.sendTransaction({
      from: this.state.wallet,
      to: CONTRACT_ADDRESS,
      value: 0,
      gas: CONTRACT_GAS_LIMIT,
      gasPrice: CONTRACT_GAS_PRICE,
      data: '0x'
    })

    this.setState({ transaction })
  }

  renderAlert = () => {
    if (!this.state.web3) {
      return (<AlertHelper state='no-web3' />)
    }
    if (!this.state.validNetwork) {
      return (<AlertHelper state='invalid-network' />)
    }
    if (!this.state.wallet) {
      return (<AlertHelper state='no-wallet' />)
    }
    if (!this.state.attended) {
      return (<AlertHelper state='no-attend' />)
    }
    if (!this.state.hadTicket) {
      return <AlertHelper state='no-refund' />
    }
    if (this.state.transaction) {
      return <AlertHelper state='refund-transaction-sent' transaction={this.state.transaction} />
    }
  }

  renderAttended() {
    const intl = this.props.intl
    return intl.formatMessage({ id: this.state.attended ? 'Attended' : 'Not Yet Attended' })
  }

  renderRegister() {
    const intl = this.props.intl
    return intl.formatMessage({ id: this.state.hadTicket ? 'Registered' : 'Not Yet Registered' })
  }

  render() {
    const intl = this.props.intl
    return (
      <div>
        <SectionHeader>
          <h2>{intl.formatMessage({ id: 'Refund' })}</h2>
          <p>{intl.formatMessage({ id: 'refundDescription' })}</p>
        </SectionHeader>
        <Container className='py-3'>
          <Row>
            <Col sm='12' md={{ size: 8, offset: 2 }}>
              {this.state.initialized && (
                <div>
                  <p>{intl.formatMessage({ id: 'Register Status' })}: <strong>{this.renderRegister()}</strong></p>
                  <p>{intl.formatMessage({ id: 'Event Status' })}: <strong>{this.renderAttended()}</strong></p>
                </div>
              )}
              <div>
                <Form>
                  <Button disabled={!this.state.attended || !this.state.hadTicket || this.state.transaction || !this.state.wallet} className='mt-3' color='primary' onClick={this.onRefund}>
                    {intl.formatMessage({ id: 'Refund' })}
                  </Button>
                </Form>
                <div className='my-3'>
                  {this.state.initialized && this.renderAlert()}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default injectIntl(Refund)
