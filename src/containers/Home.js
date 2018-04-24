import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Button, Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';
import { injectIntl } from 'react-intl'
import { Container } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/zh-cn';

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
        <SectionHeader>
          <h2>Home</h2>
        </SectionHeader>
        <Container>
          <CardDeck>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </CardDeck>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Home);
