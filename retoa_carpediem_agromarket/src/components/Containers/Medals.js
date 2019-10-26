import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpa,faSeedling,faTree} from '@fortawesome/free-solid-svg-icons'

import Goal from "./goal"

export default function Medals() {
    return (
        <div className="medals">
            <div className="medals-bar">
                    <div className="medals-icons">
                        <FontAwesomeIcon icon={faSpa} size={"4x"}  className=""/>
                        <FontAwesomeIcon icon={faSeedling} size={"4x"}  className="inactive"/>
                        <FontAwesomeIcon icon={faTree} size={"4x"}  className="inactive"/>
                    </div>
                    <div className="medals-line">
                        <div className="medals-line-active">
                            
                        </div>  
                    </div>
            </div>
            <div className="medals-prices">
                <Goal classcolor="colorgreen" iconpos={0} title={"Aumento de productividad del 20%"} description={"Felicidades lograste una racha de tratos exitosos"}></Goal>
                <Goal classcolor="colorgreen" iconpos={1} title={"Disminución de la tasa de crédito al 2%"} description={"Felicidades lograste disminuir la taza de tu crédito"}></Goal>
                <Goal classcolor="" iconpos={2} title={"Cosechar productos de la categoría mas demandada"} description={"Prueba utilizar el lector de tendencias para decidir"}></Goal>
                <Goal classcolor="" iconpos={3} title={"Ir a tu corresponsal agromarker mas cercano"} description={"Visita al corresponsal amigo más cercano y conoce todos los beneficios que tiene para ti"}></Goal>
                
            </div>
        </div>

    )
}
