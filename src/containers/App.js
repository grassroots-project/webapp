import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { addLocaleData, IntlProvider } from 'react-intl'
// import enUS from './locales/en-US'
import zhHans from '../locales/zh-Hans'

import './App.css';
import Home from './Home';
import Fund from './Fund';
import Knowledge from './Knowledge';
import Register from './Register';
import Subscription from './Subscription'
import Redemption from './Redemption'
import Refund from './Refund';
import Admin from './Admin';
import Footer from '../components/Footer';
import Header from '../components/Header';

// addLocaleData(enUS.data)
addLocaleData(zhHans.data)

class App extends Component {
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

  getLocale = () => {
    const lang = localStorage.getItem('lang')
    switch (lang) {
      // case 'en':
      //   return enUS
      default:
        return zhHans
    }
  }

  render() {
    const locale = this.getLocale()
    return (
      <IntlProvider locale={locale.locale} messages={locale.messages}>
        <Router basename="/webapp">
          <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/fund" component={Fund} d={this}/>
            <Route path="/subscription/:hash" component={Subscription} />
            <Route path="/redemption/:hash" component={Redemption} />
            <Route path="/register" component={Register} />
            <Route path="/refund" component={Refund} />
            <Route path="/knowledge" component={Knowledge} />
            <Route path="/admin" component={Admin} />
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
