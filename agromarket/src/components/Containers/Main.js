import React, { Component } from 'react'
import "./Main.css"

import Transaction from "./Transaction"

export default class Main extends Component {
    render() {
        return (
            <div className="balance">
                <div className="balance-banner">
                    <h2>Tu balance es:</h2>
                    <span className="balance-value">$200.000</span>
                    <p>{(new Date()).toUTCString()}</p>
                </div>
                <div className="transactions">
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                    <Transaction alt={"Tomate"}/>
                </div>
            </div>
        )
    }
}
