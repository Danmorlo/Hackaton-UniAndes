import React from 'react'

export default function Offer(props) {
    return (
        <div className="offer">
            <div className="offer-photo">
                <img src={props.url}></img>
            </div>
            <div className="offer-text">
                <h4>{props.title}</h4>                
                <div className="offer-line">
                    <div className={"offer-line-active " +props.porcentaje}>
                    </div>  
                </div>
                <div className="offer-txt">
                    <p>Consultar propuesta</p>
                </div>
                
            </div>
        </div>
    )
}
