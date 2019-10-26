import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket,faMedal,faMoneyBillWave,faExchangeAlt} from '@fortawesome/free-solid-svg-icons'


let icons = [faShoppingBasket, faMedal,faExchangeAlt,faMoneyBillWave]
export default function Navigationelement(props) {
    
    return (
        <div className={"navigationelement " + props.active} onClick={() => props.manage(props.iconpos,props.managecomponent)}>
            <FontAwesomeIcon icon={icons[props.iconpos]} size={"2x"} />
        </div>
    )
}
