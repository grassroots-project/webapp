import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
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


// addLocaleData(enUS.data)
addLocaleData(zhHans.data)

const { REACT_APP_NAME: APP_NAME, REACT_APP_BASENAME: BASENAME } = process.env;

const Storage = (storage = localStorage) => ({
  getItem(key) {
    return localStorage.getItem(`${APP_NAME}_${key}`);
  },
  setItem(key, value) {
    return localStorage.setItem(`${APP_NAME}_${key}`, value);
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.storage = Storage();
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
    console.log(BASENAME)
    return (
      <IntlProvider locale={locale.locale} messages={locale.messages}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/fund/" component={Fund} />
            <Route path="/fund/:hash" component={Fund} />
            <Route path="/fund/:hash/subscription" component={Subscription} />
            <Route path="/fund/:hash/redemption" component={Redemption} />
            <Route path="/register" component={Register} />
            <Route path="/refund" component={Refund} />
            <Route path="/knowledge" component={Knowledge} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
