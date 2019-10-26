import React from 'react';
import PropTypes from 'prop-types';

export default class Main extends React.Component {
  render() {
    return (
      <div id="content-main">
        <div>
          <div>
            <button onClick={this.props.goTo(2)}>Consulta tu Saldo</button>
          </div>
          <div>
            <button onClick={this.props.goTo(3)}>Historico de Transacciones</button>
            <button onClick={this.props.goTo(4)}>Insumos para tu cultivo</button>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  goTo: PropTypes.func.isRequired
};
