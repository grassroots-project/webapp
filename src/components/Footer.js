import React, { Component } from 'react';
import { injectIntl } from 'react-intl'
import { Container, Row, Col } from 'reactstrap';
const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  // marginTop: "24px",
  padding: "70px",
  left: "0",
  bottom: "0",
  // height: "60px",
  width: "100%",
}
class Footer extends Component {
  render() {
    return (
      <footer style={style} >
        <Container >
          {/* <Row>
          <Col xs="3"><p>Xiaoping Tang Copyright © 2018</p></Col>
            <Col xs="auto"></Col>
          </Row> */}
          <p>Xiaoping Tang Copyright © 2018</p>
        </Container>
      </footer>
    );
  }
}

export default injectIntl(Footer);
