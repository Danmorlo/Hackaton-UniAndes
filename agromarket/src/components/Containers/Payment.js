import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro} from '@fortawesome/free-solid-svg-icons'

import code from "../../resources/code.png"
export default function Payment() {
    return (
        <div className="payment-container">
            <div className="payment-code">
                <img src={code} alt={"QR code"}></img>
            </div>
            <div className={"payment-photo"}>
                <div className="payment-camera">
                    <input type="file" name="file" id="file" className="inputfile" accept="image/*"/>
                    <label htmlFor="file"><FontAwesomeIcon icon={faCameraRetro} size={"2x"} /> Tomar foto</label>
                </div>
            </div>
        </div>
    )
}
