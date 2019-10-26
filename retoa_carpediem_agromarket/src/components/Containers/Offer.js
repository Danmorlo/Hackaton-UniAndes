import React from 'react'
import Swal from "sweetalert2"
import SimpleMap from '../SimpleMap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default class Offer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mv:"invisible",
            todelete:""
        }
    }
    render(){
        return (
                <div className={"offer " + this.state.todelete}>
                    <div className="offer-photo">
                        <img src={this.props.url}></img>
                    </div>
                    <div className="offer-text">
                        <h4>{this.props.title}</h4>                
                        <div className="offer-line">
                            <div className={"offer-line-active " +this.props.porcentaje}>
                            </div>  
                        </div>
                        <div className="offer-txt">
                            <p onClick = { () => {
                                if(this.state.mv === "visible"){
                                    this.setState({
                                        mv:"invisible"
                                    })
                                }else{
                                    this.setState({
                                        mv:"visible"
                                    })
                                }                                
                            }
                        }>Consultar propuesta</p>
                        </div>
                        
                    </div>
                    <div className={"map " + this.state.mv}>
                        <SimpleMap></SimpleMap>
                        <Button variant="primary" onClick = { (e) => {
                            console.log(this)
                                if(this.state.mv === "visible"){
                                    this.setState({
                                        mv:"invisible",
                                        todelete:"invisible"
                                    })
                                    Swal.fire({
                                        type:"success",
                                        text:"Propuesta aceptada"
                                    })
                                }else{
                                    this.setState({
                                        mv:"visible"
                                    })
                                }                                
                            }}>Escoger propuesta</Button> <br></br>
                        <Button variant="danger"onClick = { () => {
                                if(this.state.mv === "visible"){
                                    this.setState({
                                        mv:"invisible",
                                        todelete:"invisible"
                                    })
                                    Swal.fire({
                                        type:"error",
                                        text:"Propuesta rechazada"
                                    })
                                }else{
                                    this.setState({
                                        mv:"visible"
                                    })
                                }                                
                            }}>Rechazar propuesta</Button>
                    </div>
                </div>
            )
        }
    
}
