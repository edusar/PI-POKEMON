import axios from "axios";

export const GET_ALL_POKEMONS ="GET_ALL_POKEMONS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_ID = "GET_BY_ID"
export const GET_TYPES = "GET_TYPES"
export const FILTER_BY_TYPES = "FILTER_BY_TYPES"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET"
export const CLEAN_STATE = "CLEAN_STATE"
export const CLEAN_DETAIL = "CLEAN_DETAIL"

export function getAllPokemons(name){

    if(name){
    return  function(dispatch){
        name=name.toLowerCase();
        
        return axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(response => {
            dispatch({
            type:GET_BY_NAME ,
            payload:response.data
        })
    })
        .catch(err=>{
            alert("Por favor verifique el nombre")
            // window.location.assign("./home")
            return err
        })
        
       
    }
}else{
    return async function(dispatch){
        const pokemons = await axios.get("http://localhost:3001/pokemons")
        console.log(pokemons.data,"poke")
     
        try{
            dispatch({
                    type:GET_ALL_POKEMONS ,
                    payload:pokemons.data
        })
            }
            catch(err){
                
                return alert(err.message)
            }
        }
    }
}

export function getPokemonsById (id) {
    return async function(dispatch){

        const byId = await axios.get("http://localhost:3001/pokemons/"+id)
        console.log(byId.data,"este es id")
        try{
        dispatch({
            type: GET_BY_ID,
            payload:byId.data
        })
        console.log("Entre en action")
    }
    catch(err){
        console.log("No se encontro ningun pokemon")
        return alert(err.message)
    }
    }
} 


export function getTypes(){

    return async function(dispatch){

        const gettingTypes = await axios.get("http://localhost:3001/types")
        try{
        dispatch({
            type:GET_TYPES,
            payload:gettingTypes.data
        })
        }catch(err){
            alert("Error en action types")
            return err.message
        }
    }
}


// -------------------------------------//filtros-----------------

export function getPokemonTypeSelected(type){
    
    return async function(dispatch){
        dispatch({
            type:FILTER_BY_TYPES,
            payload:type
        })
    }
}

export function orderPokemonByAttack(order){
    return async function(dispatch){
    dispatch({
        type:ORDER_BY_ATTACK,
        payload:order
    })
}}



export function orderPokemonAlphabet(order){
    return async function(dispatch){
        dispatch({
            type:ORDER_BY_ALPHABET,
            payload:order
        })
    }
}


export function filterByCreated (payload){
    console.log(payload,"filter en action")
    return async function(dispatch){
        dispatch({
            type:FILTER_CREATED,
            payload
        })
    }
}


export function cleanState(clean){
    console.log(clean,"clean")
    return async function(dispatch){
       await dispatch({
            type:CLEAN_STATE,
            payload:clean
        })
    }
}


export function cleanDetail (){
    return {
        type:CLEAN_DETAIL
    }
}