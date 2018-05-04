import React, { Component } from 'react';
import { injectIntl } from 'react-intl'
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  // textAlign: "center",
  // marginTop: "24px",
  padding: "70px",
  left: "0",
  bottom: "0",
  // height: "60px",
  width: "100%",
}
class Footer extends Component {
  render() {
    const intl = this.props.intl
    return (
      <footer style={style} >
        <Container >
          <Row>
            <Col sm="3">
              <h5>Grassroots</h5>
              <ul className="list-unstyled text-small">
                <li><Link to="/about" className="text-muted">{intl.formatMessage({ id: 'About' })}</Link></li>
                <li><Link to="/knowledge" className="text-muted">{intl.formatMessage({ id: 'Knowledge' })}</Link></li>
              </ul>
            </Col>
            <Col sm="3">
              <h5>Community</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="https://github.com/grassroots-project/community/wiki" rel="noopener noreferrer">Wiki</a></li>
                <li><a className="text-muted" href="https://t.me/grassrootsproject" rel="noopener noreferrer">Telegram</a></li>
                <li><a className="text-muted" href="https://grassroots-project.slack.com/" rel="noopener noreferrer">Slack</a></li>
              </ul>
            </Col>
            <Col sm="auto"><p>Grassroots Project Copyright &copy; 2018</p></Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default injectIntl(Footer);
