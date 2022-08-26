import "./Card.css"
import {useHistory} from "react-router-dom"
import {getPokemonsById} from '../../actions/actionCreator'
import { useDispatch, useState} from "react-redux"
import cargando from "../imagenes/cargando.gif"

export default function Card({id,image,name,types}){
    const history = useHistory()
    const dispatch =useDispatch()
    const carGando = cargando

  
    const handleDetail= ()=>{
        
  
        dispatch(getPokemonsById(id))
        history.push(`/home/cardDetail/${id}`)
        console.log("history", id)
        
    }
    return (
        <div >
            <button className="card-btn" onClick={()=>{handleDetail()}}> 
            <div><img className="image-btn"src={image} alt="No se encontro la imagen"/></div>
            <div>Nombre: {name}</div>
            <div>Tipo: {types}</div>
            </button>
        </div>
    )
}