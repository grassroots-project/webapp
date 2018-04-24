import React, { Component } from 'react';
import ethjs from 'ethjs';
import firebase from 'firebase';

import { injectIntl } from 'react-intl'
import { Container } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/zh-cn';

import FundHelper from '../components/FundHelper';
import SectionHeader from '../components/SectionHeader';
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  CONTRACT_INTERVAL_TIME,
  NETWORK_ID
} from '../constants'

const MOMENT_LANG = localStorage.getItem('lang') === 'en' ? 'en' : 'zh-cn';

moment.locale(MOMENT_LANG);


class Fund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: true,
      funds: {},
      wallet: '',
      transaction: '',
      hadTicket: false,
      initialized: false,
      attended: false,
      validNetwork: false
    }
  }
  componentWillMount() {

    firebase.database().ref('funds').on('value', (snapshot) => {
      let funds = snapshot.val() || {};

      Object.keys(funds).forEach(hash => {
        if (this.state.funds[hash]) {
          funds[hash].name = this.state.funds[hash].name;
        }
      });
      this.setState({ funds });
    });

    this.checkWeb3IntervalId = setInterval(
      async () => {
        const state = {}
        try {
          const web3 = window.web3
          state.web3 = web3
          if (web3) {
            const networkId = web3.version.network
            state.validNetwork = (networkId === NETWORK_ID)
            const eth = new ethjs(window.web3.currentProvider)
            const accounts = await eth.accounts()
            const wallet = accounts[0]
            state.wallet = wallet
            if (wallet) {
              const Ticket = eth.contract(CONTRACT_ABI)
              const ticket = Ticket.at(CONTRACT_ADDRESS)
              const userIdResult = await ticket.userId(wallet)
              const userId = userIdResult[0]
              const hadTicket = userIdResult[0] > 0
              state.hadTicket = hadTicket
              const attended = await ticket.isAttend(userId)
              state.attended = attended[0]
            } else {
              state.hadTicket = false
              state.attended = false
            }
            state.initialized = true
            this.checkWeb3IntervalId && this.setState({ ...this.state, ...state })

          }
        } catch (error) {
          state.web3 = false
          state.initialized = true
          this.checkWeb3IntervalId && this.setState({ ...this.state, ...state })
          console.log(error)
        }
      }, CONTRACT_INTERVAL_TIME)
  }

  componentWillUnmount() {
    clearInterval(this.checkWeb3IntervalId)
    this.checkWeb3IntervalId = null
  }
  
  render() {
    // const intl = this.props.intl
    // console.log(this.props)
    return (
      <div>
        <SectionHeader>
          <h2>Fund</h2>
        </SectionHeader>
        <Container>
        <FundHelper funds={this.state.funds}/>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Fund);