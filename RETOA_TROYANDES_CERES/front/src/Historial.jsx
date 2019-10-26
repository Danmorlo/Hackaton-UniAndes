import React from 'react';
import PropTypes from 'prop-types';

export default class Historial extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historial: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.props.getTransactions((transacciones) => {
      this.setState({ historial: transacciones, loaded: true });
    });
  }

  formatMoney(money) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(money);
  }

  render() {
    return (
      <div id="content-historial">
        <div>
          <div><span>Historial de Transacciones</span></div>
          <div id="transacciones-scroll">
            {this.state.loaded
              ? this.state.historial.map((i, index) => (
                <div key={index} className="history-item">
                  <span>{`${i.type} ${i.where}`}</span>
                  <span>{this.formatMoney(i.value)}</span>
                </div>))
              : <div className="lds-ripple"><div></div><div></div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Historial.propTypes = {
  getTransactions: PropTypes.func.isRequired
};
