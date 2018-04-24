import React, { Component } from 'react';
import { Table, ButtonGroup, Button } from 'reactstrap'

class FundHelper extends Component {

  renderFund() {
    const funds = [];
    // this.props.funds
    Object.keys(this.props.funds).forEach(hash => {
      const fund = this.props.funds[hash];
      fund.hash = hash;
      fund.share = 1000000;
      funds.push(fund);
    });

    const rows = funds.map((fund, i) => {
      return (
        <tr key={`${fund.hash}-${i}`}>
          <th>{i}</th>
          <td>{fund.name}</td>
          <td>{fund.description}</td>
          <td>{fund.share}</td>
          <td>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.handleSubscription(fund.hash)}>申购</Button>
              <Button color="warning" onClick={() => this.handleRedemption(fund.hash)}>赎回</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>基金名称</th>
            <th>基金介绍</th>
            <th>份额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }

  handleSubscription(hash) {
    window.location.assign('/subscription/' + hash );

  }

  handleRedemption(hash) {
    window.location.assign('/redemption/' + hash );
  }

  render() {
    return (
      <div>
        {this.renderFund()}
      </div>
    );
  }
}

export default FundHelper;