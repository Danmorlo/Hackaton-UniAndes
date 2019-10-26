import React from 'react'
import Marketstock from './Marketstock'
import Marketoffers from './marketoffers'

export default function Market() {
    return (
        <div className="marker-container">
            <Marketstock/>
            <Marketoffers/>
        </div>
    )
}
