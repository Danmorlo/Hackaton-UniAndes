import React from 'react'
import Indicator from './indicator'

export default function Marketindicators() {
    return (
        <div className="market">
            <Indicator classcolor="colorgreen" iconpos={0} product={"Papa"} cost={"$4000"}/>
            <Indicator classcolor="colorred" iconpos={1} product={"Mazorca"} cost={"$1990"}/>
            <Indicator classcolor="colorgreen" iconpos={0} product={"Papaya"} cost={"$1960"}/>
        </div>
    )
}
