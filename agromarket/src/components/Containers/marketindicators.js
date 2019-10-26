import React from 'react'
import Indicator from './indicator'

export default function Marketindicators() {
    return (
        <div className="market">
            <Indicator classcolor="colorgreen" iconpos={0} product={"Papa"} cost={"$1000"}/>
            <Indicator classcolor="colorred" iconpos={1} product={"Maiz"} cost={"$300"}/>
            <Indicator classcolor="colorgreen" iconpos={0} product={"Papaya"} cost={"$600"}/>
        </div>
    )
}
