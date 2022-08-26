import "./NavBar.css"
import { getAllPokemons,cleanState, getPokemonTypeSelected, orderPokemonByAttack,orderPokemonAlphabet, filterByCreated} from "../../actions/actionCreator"
import { useState, useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useHistory } from "react-router-dom"




export default function NavBar() {
const history = useHistory()
const pokeTypes = useSelector(state =>state?.types)
const [flagOrder, setFlagOrder]=useState(true)
const [order, setOrder]=useState("")
const [selectedType, setSelectedType]=useState("Quitar filtro")
const [search, setSearch]=useState("")
const [flag,setFlag]=useState(true)
const [flag2,setFlag2]=useState(true)
const [names,setNames]=useState("")
const [atakks,setAttakks]=useState("")
const dispatch = useDispatch()

const pokeName = (e)=>{
    e.preventDefault()
    let regex = /[0-9]/
    if(regex.test(e.target.value)){
        setSearch("")
    }else{
        setSearch(e.target.value)
    }
}


const pokeSearch= ()=>{
dispatch(getAllPokemons(search))
setSearch("")

}
useEffect(()=>{},[search])

const typeSelected = (e)=>{
    
    dispatch(getPokemonTypeSelected(e.target.value))
    setSelectedType(e.target.value)

}

const filteredByCreated= (e)=>{

    dispatch(filterByCreated(e.target.value))
    setFlagOrder(!flagOrder)
    setSelectedType(e.target.value)


}

const sendOrder =(type)=>{
setOrder(type)
setFlagOrder(!flagOrder)


}

const resetState = (e)=>{
    dispatch(cleanState(e.target.value))

 
}

useEffect(()=>{
    if( order === "Attack"){
        dispatch(orderPokemonByAttack(flagOrder))
    
        setFlag(!flag)
        if(flag2 ===true){
            setAttakks(" de menor a mayor.")
            setFlag2(false)
        }else{
     
            setAttakks(" de mayor a menor.")
            setFlag2(true)
        }
    }else if( order === "Alphabet"){
        dispatch(orderPokemonAlphabet(flagOrder))
        setFlag2(!flag2)
        if(flag===true){
       
        setNames("A-Z")
        setFlag(false)
        }else{
           
            setNames("Z-A")
            setFlag(true)}
    }


},[order, flagOrder])




const goToForm = ()=>{
    history.push("/home/Form")
}


    return(
        <div className="nav-container">
            
            <div className="div-search">
                <input className="search" value={search} type="text" placeholder="Busca un pokemon" onChange={(e)=>{pokeName(e)}} />
                <button type="button" onClick={() => pokeSearch()}>Buscar</button>
                <br/>
                <button className="search" value="Limpiar busqueda" onClick={(e)=>{resetState(e)}}>Limpiar busqueda</button>
            </div>
         
          

            <div className="div-create">
            <label>Filtra por creacion</label>
                <select onChange={(e)=>{filteredByCreated(e)}} multiple={false}>
                <optgroup   label="-Selecciona por creacion-"/>
                <option key="1212"name="todos">Todos</option>
                <option key="13" name="createdAt">Creados</option>
                <option key="14" name="nonCreated">Originales</option>
                <option key="15" name="delete">Quitar filtro</option>
                </select>
            </div>
            <div className="div-create">
            <label>Filtar por tipo</label>
                <select value={selectedType} onChange={(e)=>{typeSelected(e)}}>
                <optgroup label="-Filtar por tipo-"/>
             
                  {pokeTypes?.map((n)=>{
                      console.log(n.name)
                      return <option>{n.name}</option>})}
                      <option key="1212">Quitar filtro</option>
                </select>
            </div>

            
            
            <div className="div-create">
                <label>Ordenar por:</label><button onClick={()=>{sendOrder("Alphabet")}}>Orden Alfabetico  {names}</button>
                
                        <button onClick={()=>{sendOrder("Attack")}}>Ataque{atakks}</button>
            </div>
            <div className="poke-create">
            <button className="btn-style" onClick={()=>{goToForm()}}>Crear tu pokemon → </button>
            </div>
        </div>

    )
}