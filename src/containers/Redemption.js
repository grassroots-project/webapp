import React, { Component } from 'react';
import { injectIntl } from 'react-intl'
import { Container, Row, Col } from 'reactstrap'


class Redemption extends Component {
  render() {
    // const tpye = this.state
    // console.log(this.props.history)
    return (
      <div>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <h2>
                Redemption
              </h2>
              <p>
                <a href="">check</a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Redemption);