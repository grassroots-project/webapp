import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import backgroundImage from '../assets/background.png';

const style = {
  textAlign: 'center',
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '200px',
  padding: '100px 0 100px 0',
  marginBottom: '24px',
}

export default class SectionHeader extends Component {
  render() {
    // console.log(this.props)
    return (
      <section className='section-header' style={style}>
        <Container>
          <Row>
            <Col sm='12' md={{ size: 8, offset: 2 }}>
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}
