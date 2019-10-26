import React from 'react'
import "./Nav.css"

// my components
import Navigationelement from "./Navigationelement"
import Plus from "./Plus"

export default function Nav(props) {
    let elements = [];
    for (let i = 0; i < 4; i++) {
        if(i === props.numberactive){
            elements.push(<Navigationelement iconpos={i} active={"active"} manage={props.manage} managecomponent={props.managecomponent}/>)
        }else{
            elements.push(<Navigationelement iconpos={i} active={"deactive"} manage={props.manage} managecomponent={props.managecomponent}/>)
        }
    }
    return (
        <div className="navigationbar">
            {elements[0]}
            {elements[1]}
            <Plus/>
            {elements[2]}
            {elements[3]}
        </div>
    )
}
