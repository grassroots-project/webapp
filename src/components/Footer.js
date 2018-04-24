import React, { Component } from 'react';
import { injectIntl } from 'react-intl'
import { Container } from 'reactstrap';
const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    marginTop: "24px",
    padding: "20px",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}
class Footer extends Component {
  render() {
    return (
      <footer style={style} >
        <Container>
          <p>Xiaoping Tang Copyright © 2018</p>
        </Container>
      </footer>
    );
  }
}

export default injectIntl(Footer);
