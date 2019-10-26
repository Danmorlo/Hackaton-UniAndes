import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard,faAppleAlt, faChartLine, faMapMarked} from '@fortawesome/free-solid-svg-icons'
export default function Goal(props) {
    let icons = [faCreditCard,faAppleAlt,faChartLine,faMapMarked]
    return (
        <div className="goal-container">
            <div className="goal-icon">
                <FontAwesomeIcon icon={icons[props.iconpos]} size={"3x"} className={props.classcolor}/>
            </div>
            <div>
                <h4 className={props.classcolor}>{props.title}</h4>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
