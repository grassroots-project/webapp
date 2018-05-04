import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { injectIntl } from 'react-intl'

import { Container, Row, Col, Button } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Header from '../components/Header';

class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }


  render() {
    const intl = this.props.intl
    return (
      <div>
        <Navbar color="light" light fixed="top" expand="md">
          <Container>
            <NavbarBrand tag={Link} to="/">
              {/* <img className="align-middle d-inline-block" width="40" height="40" alt="Grassroots-Project Logo" /> */}
              <span className="align-middle">Grassroots</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <NavItem>
                  <NavLink tag={Link} to="/investors">
                    {intl.formatMessage({ id: 'Investors' })}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/manager">
                    {intl.formatMessage({ id: 'Manager' })}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" target="_blank" rel="noopener noreferrer">
                    {intl.formatMessage({ id: 'Contact Us' })}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/knowledge">
                    {intl.formatMessage({ id: 'Knowledge' })}
                  </NavLink>
                </NavItem>

                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {intl.formatMessage({ id: 'Language' })}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={this.handleEnglishItemOnClick}>
                      English
                </DropdownItem>
                    <DropdownItem onClick={this.handleChineseItemOnClick}>
                      简体中文
                </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Container>
          <h1>Investors</h1>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Investors);