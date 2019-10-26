import React from 'react'

export default function Transaction(props) {
    return (
        <div className="transaction-container">
            <div className="transaction-photo">
                <img src={props.img}  alt={props.alt}></img>
            </div>
            <div className="transaction-info">
                <h4>Venta de {props.alt}</h4>
                <p>Venta de {props.alt} al por mayor por libras</p>
                <div className="transactions-sell">
                    <div>
                        Precio c/u: <b> ${props.precio}</b>
                    </div>
                    <div>
                        Cantidad: <b> {props.cantidad}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
