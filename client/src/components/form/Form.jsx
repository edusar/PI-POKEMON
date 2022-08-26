import "./Form.css"
import axios from "axios"
import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"



export default function Form (){
    const tipos = useSelector(state=>state?.types)
    const [habilitacion, setHabilitacion] = useState(true)
    const history = useHistory()
    
    const[data, setData] = useState({
        name:"",
        image:"",
        hp:"",
        attack:"",
        height:"",
        weight:"",
        speed:"",
        defense:"",
        types:[]

    })
    const [error, setError] = useState({
        name:"",
        image:"",
        hp:"",
        attack:"",
        height:"",
        weight:"",
        speed:"",
        defense:"",
        types:[]
    })
    
    const numb=["1","2","3","4","5","6","7","8","9"]
    function validate(e){
   
        if(e.target.name === "type" ){
            let dataType = data.types
            if(dataType.includes(e.target.value)){
                console.log("entre en type")
                setData({...data, types:[]})
                setError({...error, types:"No deberias repetir el tipo en la seleccion"})
            }else if(dataType.length > 4){
                setData({...data, types:[]})
                setError({...error, types:"El numero de selecciones debe ser menor a 5"})
            }
            else{
            setData({...data, types:[...dataType, e.target.value]})
            setError({...error, types:""})
            }
        }else{
            if(e.target.name === "name"){
                let special = /[^((0-9)|(a-z)|(A-Z)|\s)]/
                if(special.test(e.target.value)){
                    setData({...data, name:""})
                    setError({...error, name:"El nombre no puede contener numeros ni caracteres especiales"})
                }else if(numb.includes(e.target.value)){
                    setData({...data, name:""})
                    setError({...error, name:"El nombre no puede contener numeros ni caracteres especiales"})
                }else if(e.target.value.length > 15){
                    setData({...data, name:""})
                    setError({...error, name:"El nombre no debe superar los 15 caracteres"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, name:""})
                }
                
            }else{
                setData({...data, [e.target.name]:e.target.value})
            }if(e.target.name === "image" && e.target.value.length > 6){
                let barras = /htt/
                if(barras.test(e.target.value) === false ){
                    setData({...data, image:""})
                    setError({...error, image:"El texto debe ser de tipo URL"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, image:""})
                }
            }if(e.target.name === "hp"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 100 ){
                    setData({...data, hp:""})
                    setError({...error, hp:"El maximo de vida es de 100"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, hp:""})
                    setError({...error, hp:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, hp:""})
                }
            }if(e.target.name === "height"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 150 ){
                    setData({...data, height:""})
                    setError({...error, height:"El maximo de altura es de 150"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, height:""})
                    setError({...error, height:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, height:""})
                }
            }if(e.target.name === "attack"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 1000 ){
                    setData({...data, attack:""})
                    setError({...error, attack:"El maximo de ataque es de 1000"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, attack:""})
                    setError({...error, attack:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, attack:""})
                }
            }if(e.target.name === "weight"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 10000){
                    setData({...data, weight:""})
                    setError({...error, weight:"El maximo de peso es de 10000"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, weight:""})
                    setError({...error, weight:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, weight:""})
                }
            }if(e.target.name === "defense"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 100 ){
                    setData({...data, defense:""})
                    setError({...error, defense:"El maximo de defensa es de 100"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, defense:""})
                    setError({...error, defense:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, defense:""})
                }
            }if(e.target.name === "speed"){
                let alphabet= /[a-zA-Z]/
                if(e.target.value > 2000 ){
                    setData({...data, speed:""})
                    setError({...error, speed:"El maximo de velocidad es de 2000"})
                }else if(alphabet.test(e.target.value)|| e.target.value.includes("-")){
                    setData({...data, speed:""})
                    setError({...error, speed:"El valor solo debe ser numerico"})
                }else{
                    setData({...data, [e.target.name]:e.target.value})
                    setError({...error, speed:""})
                }
            }

        }
     
    }
    
    useEffect(() => {
        console.log("afuera")
        if(data.name.length && data.image.length && data.hp.length && data.attack.length && data.height.length&& data.weight.length && data.defense.length && data.speed.length && data.types.length){
            if(!error.name.length && !error.image.length && !error.hp.length && !error.attack.length && !error.height.length&& !error.weight.length && !error.defense.length && !error.speed.length && !error.types.length){
                setHabilitacion(false)
            }else{
                setHabilitacion(true)
            }
            }else{
                setHabilitacion(true)}

    }, [error, data])
    
    const backHome=()=>{
        history.push("/home")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        try {
            axios.post(`http://localhost:3001/pokemons`, {

                name:data.name,
                image:data.image,
                hp:data.hp,
                attack:data.attack,
                height:data.height,
                weight:data.weight,
                speed:data.speed,
                defense:data.defense,
                types:data.types

            })
       
            window.location.assign("/home")
            alert("Pokemon creado exitosamente")

        } catch (err) {
            alert("No se pudo crear el pokemon. Verifique los datos y vuelva a intentarlo")
            return err
        }


    }
    
    return (<div className="form form-bkg" >

        <h1 className="titleCr">Aqui puedes crear tu pokemon llenando los campos requeridos:</h1>
        <button onClick={()=>backHome()}>Volver a Home</button>
        <form  className="Form-Cnt" onSubmit={(e) => { handleSubmit(e) }}>


            <div className={"singleInpt"}><label>Nombre del pokemon: </label>
            <input className={error.name && 'danger'} name="name" value={data.name} type="text" placeholder="ej:Pikachu"
                onChange={(e) => { validate(e) }} /> {!error.name ? null : <span>{error.name}</span>}
            </div>

            <div className={"singleInpt"}><label>Coloca una URL de la imagen: </label>
            <input className={error.image && 'danger'} name="image" value={data.image} type="text" placeholder="http/..."
                onChange={(e) => { validate(e) }} /> {!error.image ? null : <span>{error.image}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Vida: </label>
            <br />
            <input className={error.hp && 'danger'} name="hp" value={data.hp} type="text" placeholder="0-100"
                onChange={(e) => { validate(e) }} /> {!error.hp ? null : <span>{error.hp}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Ataque: </label>
            <br />
            <input className={error.attack && 'danger'} name="attack" value={data.attack} type="text" placeholder="0-1000"
                onChange={(e) => { validate(e) }} /> {!error.attack ? null : <span>{error.attack}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Altura: </label>
            <br />
            <input className={error.height && 'danger'} name="height" value={data.height} type="text" placeholder="0-150"
                onChange={(e) => { validate(e) }} /> {!error.height ? null : <span>{error.height}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Peso: </label>
            <br />
            <input className={error.weight && 'danger'} name="weight" value={data.weight} type="text" placeholder="0-10000"
                onChange={(e) => { validate(e) }} /> {!error.weight ? null : <span>{error.weight}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Defensa: </label>
            <br />
            <input className={error.defense && 'danger'} name="defense" value={data.defense} type="text" placeholder="0-100"
                onChange={(e) => { validate(e) }} /> {!error.defense ? null : <span>{error.defense}</span>}
            </div>

            <div className={"singleInpt"}>
            <label>Velocidad: </label>
            <br />
            <input className={error.speed && 'danger'} name="speed" value={data.speed} type="text" placeholder="0-2000"
                onChange={(e) => { validate(e) }} /> {!error.speed ? null : <span>{error.speed}</span>}
            </div>
           
           
         
            <div className={"singleInpt"}>
                <label >Elige uno o mas tipos de pokemon: </label>
                <select name="type" id="type" multiple={false} key={1313} onChange={(e) => { validate(e) }}>
                <option disabled selected >tipos</option>
                        {
                          tipos?.map((p)=>{return <option  key={p.name}>{p?.name}</option>})
                        }


                 
                </select>
                        {data.types.map((c)=>(<p className="types" key={c}>{c}</p>))}
                        {!error.types ? null : <span>{error.types}</span>}
            </div>


            <button disabled={habilitacion} type="submit" >Enviar</button>
        </form>
    </div>)
}