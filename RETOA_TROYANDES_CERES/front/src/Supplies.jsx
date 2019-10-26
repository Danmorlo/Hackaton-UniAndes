import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export default class Supplies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      supplies: [],
      loaded: false,
      selectedItems: [],
      showCart: false
    };
  }

  componentDidMount() {
    this.props.getSupplies((supplies) => {
      this.setState({ supplies, loaded: true, selectedItems: supplies.map(() => false) });
    });
  }

  formatMoney(money) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(money);
  }

  onSelect(i) {
    this.setState(pS => {
      const r = pS.selectedItems.slice();
      r[i] = !pS.selectedItems[i];
      return { selectedItems: r };
    });
  }

  openCart() {
    this.setState({ showCart: true });
  }

  buyCart() {
    let sum = 0;
    this.state.selectedItems.map((i, k) => ({ index: k, show: i })).filter(i => i.show).forEach(i => {
      sum += this.state.supplies[i.index].price;
    });
    this.props.buyCart(sum, () => {
      this.setState({
        selectedItems: [],
        showCart: false
      });
    });
  }

  render() {
    return (
      <div id="content-supplies">
        <div>
          <div>
            <span>Insumos para tu cultivo</span>
            <button onClick={this.openCart.bind(this)}><i className="fas fa-shopping-cart" /></button>
          </div>
          <div id="supply-scroll">
            {this.state.loaded
              ? this.state.supplies.map((i, index) => (
                <div
                  key={index}
                  className={'supply-item ' + (this.state.selectedItems[index] ? 'supply-selected' : '')}
                  onClick={() => this.onSelect(index)}>
                  <img src={i.img} />
                  <div>
                    <span>{i.name}</span>
                    <span>{this.formatMoney(i.price)}</span>
                  </div>
                </div>))
              : <div className="lds-ripple" style={{ left: '100%' }}><div></div><div></div></div>}
          </div>
        </div>
        {this.state.showCart
          &&
          <div id="modal">
            <div id="modal-bg"></div>
            <div id="modal-container">
              <div id="modal-header">Compra</div>
              <div id="modal-body">
                <div id="cart">
                  {this.state.selectedItems.map((i, k) => ({ index: k, show: i })).filter(i => i.show).map((i, k) => (
                    <div key={k} className="cart-item">
                      {this.state.supplies[i.index].name}
                    </div>
                  ))}
                </div>
                <div>
                  <button onClick={this.buyCart.bind(this)}>Comprar</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Supplies.propTypes = {
  getSupplies: PropTypes.func.isRequired,
  buyCart: PropTypes.func.isRequired
};
