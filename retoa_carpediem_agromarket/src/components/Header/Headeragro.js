import React from 'react'
import "./Headeragro.css"

import logo from "../../resources/logo.png"
export default function Headeragro() {
    return (
        <div className="header">
            <div className="headerlogo">
                <img src={logo} alt={"logo"}></img>
            </div>
            <div className="headername">
                <h4>Bienvenido:</h4>
                <h4> Francisco</h4>
            </div>
        </div>
    )
}
