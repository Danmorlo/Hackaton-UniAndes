import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons'

export default function Indicator(props) {
    let icons = [faArrowUp,faArrowDown]
    return (
        <div className="indicator-container">
            <div className="indicator-icon">
                <FontAwesomeIcon icon={icons[props.iconpos]} size={"2x"} className={props.classcolor}/>
            </div>
            <div className="indicator-text">
                <h5 className={props.classcolor}>{props.product}</h5>
                <span className={props.classcolor}>{props.cost}</span>
            </div>
        </div>
    )
}
