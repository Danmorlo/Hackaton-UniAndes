import React, { Component } from 'react'
import "./Main.css"

import Transaction from "./Transaction"

export default class Main extends Component {
    render() {
        return (
            <div className="balance">
                <div className="balance-banner">
                    <h2>Tu saldo es:</h2>
                    <span className="balance-value">$2.537.750</span>
                    <p>{(new Date()).toUTCString()}</p>
                </div>
                <div className="transactions">
                    <Transaction alt={"café"} precio={12350} cantidad={300} img={"https://img.etimg.com/thumb/msid-69997940,width-1200,height-900,resizemode-4,imgsize-322599/coffee.jpg"}/>
                    <Transaction alt={"tomate"} precio={1771} cantidad={201} img={"https://www.sqm.com/wp-content/uploads/2018/04/tomate-992x550.jpg"}/>
                    <Transaction alt={"papa sabanera"} precio={3845} cantidad={103} img={"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBN0hdg.img?h=384&w=624&m=6&q=60&o=f&l=f"}/>
                    <Transaction alt={"yuca"} precio={1350} cantidad={145} img={"https://statics-cuidateplus.marca.com/sites/default/files/styles/natural/public/planta-yuca.jpg?itok=Gr-GFucT"}/>
                    <Transaction alt={"arracacha"} precio={3070} cantidad={208} img={"http://miecodespensa.com.co/wp-content/uploads/2017/04/arracacha.png"}/>
                </div>
            </div>
        )
    }
}
