import React from 'react';
import "./resources/styles/App.css";
import Main from './Main';
import Saldo from './Saldo';
import Historial from './Historial';
import Supplies from './Supplies';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './resources/styles/loader.css';

const backUrl = "http://localhost:3001";

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);


    this.token = this.props.cookies.get('hba-token') || null;

    this.state = {
      state: this.token ? 1 : 0
    };

    this.input = {
      docu: '',
      pass: ''
    };
  }

  enterHandler() {
    (async () => {
      const data = {
        utype: 'CC',
        uid: this.input.docu,
        password: this.input.pass
      };
      const req = await fetch(`${backUrl}/api/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      const rta = await req.json();
      this.token = rta.token;
      this.props.cookies.set('hba-token', this.token, { path: '/' });
      this.props.cookies.set('hba-user', { "utype": "CC", "uid": data.uid })

      this.setState({ state: 1 });
    })();
  }

  volver() {
    this.setState({ state: 1 });
  }

  signout() {
    this.setState({ state: 0 }, () => {
      this.props.cookies.set('hba-user', null);
      this.props.cookies.set('hba-token', null);
    });
  }

  goTo(state) {
    return () => this.setState({ state });
  }

  getBalance(cbk) {
    (async () => {
      const user = this.props.cookies.get('hba-user');
      const req = await fetch(`${backUrl}/api/financial/consultarsaldo/CC/${user.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.cookies.get('hba-token')}`,
          'user': JSON.stringify(user)
        }
      });
      const rta = await req.json();

      cbk(rta.saldo)
    })();
  }

  getSupplies(cbk) {
    (async () => {
      const req = await fetch(`${backUrl}/api/following/supplies`);
      const rta = await req.json();
      cbk(rta)
    })();
  }

  getTransactions(cbk) {
    (async () => {
      const user = this.props.cookies.get('hba-user');
      const req = await fetch(`${backUrl}/api/financial/transactions/CC/${user.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.cookies.get('hba-token')}`,
          'user': JSON.stringify(user)
        }
      });
      const rta = await req.json();

      cbk(rta)
    })();
  }

  buyCart(price, cbk) {
    (async () => {
      const user = this.props.cookies.get('hba-user');

      const data = JSON.stringify({
        uid: +user.uid,
        utype: user.utype,
        type: "Compra",
        where: "en linea",
        value: +price,
        date: new Date().toString()
      });

      const req = await fetch(`${backUrl}/api/financial/buy`, {
        method:'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${this.props.cookies.get('hba-token')}`,
          'user': JSON.stringify(user),
          'Content-Type': 'application/json'
        }
      });
      const rta = await req.json();

      cbk(rta)
    })();
  }

  render() {
    let toRender = (
      <div id="main">
        <div id="blanco" />
        <div id="header">
          <div>
            <span>Bienvenido a</span>
            <div></div>
          </div>
        </div>
        <div id="content">
          <div>
            <div>
              <label>Número de Documento</label>
              <input pattern="[0-9]*" inputMode="numeric" onChange={e => this.input.docu = e.target.value} />
            </div>
            <div>
              <label>Contraseña</label>
              <input type="password" pattern="[0-9]*" inputMode="numeric" onChange={e => this.input.pass = e.target.value} />
            </div>
            <button onClick={this.enterHandler.bind(this)}>Entrar</button>
          </div>
        </div>
      </div>
    );

    switch (this.state.state) {
      case 1:
        toRender = (<Main goTo={this.goTo.bind(this)} />);
        break;
      case 2:
        toRender = (<Saldo getBalance={this.getBalance.bind(this)} />);
        break;
      case 3:
        toRender = (<Historial getTransactions={this.getTransactions.bind(this)} />);
        break;
      case 4:
        toRender = (<Supplies getSupplies={this.getSupplies.bind(this)} buyCart={this.buyCart.bind(this)} />);
        break;
    }

    return (
      <div id="main">
        <div id="blanco" />
        <div id="header">
          <div>
            <span>Bienvenido a</span>
            <div></div>
          </div>
        </div>
        {toRender}
        <div id="footer">
          {this.state.state !== 1 && <button onClick={this.volver.bind(this)}>Volver</button>}
          <button id="terminar" onClick={this.signout.bind(this)}>Terminar</button>
        </div>
      </div>
    );
  }
};

export default withCookies(App);
