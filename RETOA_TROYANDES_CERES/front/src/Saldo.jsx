import React from 'react';
import PropTypes from 'prop-types';


export default class Saldo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      loaded: false
    };
  }

  componentDidMount() {
    this.props.getBalance((budget) => {
      this.setState({ budget: budget, loaded: true });
    });
  }

  formatMoney(money) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(money);
  }

  render() {
    return (
      <div id="content-budget">
        <div>
          <div><span>Consulta de saldo</span></div>
          <div>
            <span>Su saldo actual es de</span>
            {this.state.loaded
              ? <span>{this.formatMoney(this.state.budget)}</span>
              : <div className="lds-ripple"><div></div><div></div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Saldo.propTypes = {
  getBalance: PropTypes.func.isRequired
};
