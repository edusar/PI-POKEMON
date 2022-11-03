import "./CardDetail.css"
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {cleanDetail} from "../../actions/actionCreator"




export default function CardDetail (){
const detail = useSelector(state =>state?.pokeDetail)
const history = useHistory()
const dispatch = useDispatch()
console.log(detail,"detail")

useEffect(() =>{},[detail])


const backHome=()=>{
    dispatch( cleanDetail())
history.push("/home")


}


   return (<div className="detail-container">
            <button className="back-home" onClick={()=>{backHome()}}> ← Volver a Home</button>

            <div className="CardDetail">
            <div className="card-item">Id: {detail?.id}</div>
            <div className="only-img" ><img className="image-carddetail"src={detail?.image} alt="No contiene imagen" /></div>
            <div className="card-item">Nombre: {detail.name}</div>
            <div className="card-item">Altura: {detail?.height}</div>
            <div className="card-item">Peso: {detail?.weight}</div>
            <div className="card-item">Vida: {detail?.hp}</div>
            <div className="card-item">Ataque: {detail?.attack}</div>
            <div className="card-item">Defensa: {detail?.defense}</div>
            <div className="card-item">Velocidad: {detail?.speed}</div>
            <div className="card-item">Tipo {detail?.types && detail?.types.length > 0 && detail.types.map((t, i)=>{
            
            return (<li key={i}>{t}</li>)})}</div>
            </div>
             <div className="card-item">createdby:  {detail?.createdBy || " Nintendo CO."}</div>
           
    </div>)
}



