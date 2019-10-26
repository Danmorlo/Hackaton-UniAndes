import React from 'react'

export default function Transaction(props) {
    return (
        <div className="transaction-container">
            <div className="transaction-photo">
                <img src={"https://www.sqm.com/wp-content/uploads/2018/04/tomate-992x550.jpg"}  alt={props.alt}></img>
            </div>
            <div className="transaction-info">
                <h4>Venta de tomate</h4>
                <p>Venta de tomate al por mayor por libras</p>
                <div className="transactions-sell">
                    <div>
                        Precio c/u: <b> $300</b>
                    </div>
                    <div>
                        Cantidad: <b> 60</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
