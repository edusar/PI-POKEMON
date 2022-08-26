import "./Cards.css"
import Card from '../card/Card'
import {useSelector,useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import { getAllPokemons, getTypes} from "../../actions/actionCreator"
import cargando from "../imagenes/cargando.gif"


export default function Cards (){
    const allPokemons = useSelector(state=>state?.allPokemons)
    const filtered = useSelector(state=>state?.filteredPokemons)
    const flag1 = useSelector(state=>state?.flag1)
    const loading = useSelector(state=>state?.loading)
    const [pagina, setPagina] = useState(0)
    const [paginaActual, setPaginaActual] = useState([])
    const [settingPage, setSettingPage] = useState(0)
    const [flag, setFlag] = useState(true)
    const dispatch = useDispatch()
    const carGando = cargando
    
    useEffect(()=>{
        if(!allPokemons.length){

            dispatch(getAllPokemons())
            
            dispatch(getTypes())
        }
      
    },[])


    
    const data = filtered
    console.log("data",data)
    useEffect(()=>{
        if(data){
            if(data.length < 12){
                setPagina(0)
            }
            setPaginaActual(data.slice(pagina, pagina + 12))
            
        }
    },[data, flag1, filtered,pagina])

    const siguientePag = ()=>{
        if(pagina / 12 <= data.length/12-1){
            setPagina(pagina + 12)
        }
        setFlag(!flag)
    }
    const anteriorPag = ()=>{
        if(pagina >= 12){
        setPagina(pagina - 12 )
        }
        setFlag(!flag)
    }
    

    useEffect(()=>{},[paginaActual,flag])


    if(loading){
        return <img className="loading"src={carGando}/>
    }else{
    return (
        <div >  
               
                <div className="nextprevious">
                <button className="btn-style" onClick={()=>{anteriorPag()}}>Pagina Anterior</button>
                <div className="btn-style">Pagina {(pagina / 12)+1 } de {Math.ceil(data.length /12)}</div>
                <button className="btn-style" onClick={()=>{siguientePag()}}>Pagina Siguiente</button>
                </div>
                <div className="cards" >  
            {
                 paginaActual.length < 1 && data.length < 1 ? <h1> No hay resultados</h1>:paginaActual?.map((p)=>{
                     
                return(
                    <div key={p.name}>
                  
                        <Card 
                        image={p.image?p.image:"No contiene imagen"}
                        name={p.name}
                        id={p.id}
                        types={p.types?p.types.map((t, i)=>{
                    
                        return  (<li key={i}>{t}</li>)}):"no contiene types"}
                        />
                   
                    </div>
                ) 
                    }
                    )
            }
        </div>
        </div>
      
        
    )}

        }
