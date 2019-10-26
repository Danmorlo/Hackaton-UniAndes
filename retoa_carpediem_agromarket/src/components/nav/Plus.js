import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2"

export default function Plus() {
    return (
        <div className="plus">
            <FontAwesomeIcon icon={faPlus} size={"2x"} onClick={() =>{
                Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Siguiente &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3','4']
                    }).queue([
                    {
                        title: 'Nombre del producto',
                    },
                    'Descripción',
                    'Precio',
                    'Cantidad'
                    ]).then((result) => {
                    if (result.value) {
                        Swal.fire({
                        title: 'Listo',
                        html:
                            'Tus respuestas' +
                            JSON.stringify(result.value) +
                            '</code></pre>',
                        confirmButtonText: 'Listo'
                        })
                    }
                    })
            }}/>
        </div>
    )
}
