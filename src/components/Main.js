import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap';

import Home from '../containers/Home';
class Main extends Component {
  render() {
    return (
      <section className='main'>
        <Container>
          {this.props.children}
        </Container>
      </section>
    );
  }
}

export default Main;