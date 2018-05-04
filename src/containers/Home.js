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
                  <img src={require('../assets/Building.png')} className="rounded"/>
                </div>
              </Col>
              <Col sm="6" md="6">
                <div className="showcase-right" >
                  <h1>我们的目标</h1>
                  <p>利用智能合约来减少基金管理第三方的需求，提高投资者的透明度。</p>
                  <p>遵守ERC20 Token来提高投资者流动性。</p>
                </div>
                <br />
                <Button outline >Read More</Button>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="testimonial">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <p>由于我们还没有公开发布，想要在第一时间构建自己基金，请在下面</p>
                <p className="customer">
                <Link to="/register"><Button outline color="primary">申请加入</Button></Link>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <section id="info">
          <Container>
          <Row>
              <Col sm="6" md="6">
                <div className="border-left">
                  
                </div>
              </Col>
              <Col sm="6" md="6">
                <div className="border-bottom" >
                  <h1>Grassroots Project</h1>
                  <p>使用智能合约和ERC20 Token来提高投资者的透明度和流动性。</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Home);
