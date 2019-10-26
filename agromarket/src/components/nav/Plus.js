import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'


export default function Plus() {
    return (
        <div className="plus">
            <FontAwesomeIcon icon={faPlus} size={"2x"}/>
        </div>
    )
}
