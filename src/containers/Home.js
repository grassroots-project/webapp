import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'reactstrap';
import { injectIntl } from 'react-intl'

import moment from 'moment';
import 'moment/locale/zh-cn';

import Footer from '../components/Footer';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';

// import { REGISTRATION_TIME } from '../constants';

const MOMENT_LANG = localStorage.getItem('lang') === 'en' ? 'en' : 'zh-cn';
moment.locale(MOMENT_LANG);

class Home extends Component {
  render() {
    // const registrationTime = moment(REGISTRATION_TIME).format('llll');
    // const intl = this.props.intl
    return (
      <div>
        <Header />
        <section id="showcase">
          <Container>
            <Row>
              <Col sm="6" md="6">
                <div className="showcase-left">
                  {/* <img src={require('../assets/image1.jpg')} /> */}
                </div>
              </Col>
              <Col sm="6" md="6">
                <div className="showcase-right" >
                  <h1>Grassroots Project</h1>
                  <p>使用智能合约和ERC20 Token来提高投资者的透明度和流动性。</p>
                </div>
                <br />
                <Button>Read More</Button>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="testimonial">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h1 className="display-3">目标</h1>
                <p className="lead">利用区块链技术来减少对托管人，会计师，传统资产管理审计师等基金管理第三方的需求。</p>
                <p className="lead">
                  <Button color="primary">Learn More</Button>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="info">
        </section>

        <Footer />
      </div>
    );
  }
}

export default injectIntl(Home);
