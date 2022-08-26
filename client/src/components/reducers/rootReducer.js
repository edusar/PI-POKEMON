import { GET_ALL_POKEMONS, CLEAN_DETAIL, GET_BY_ID, GET_BY_NAME, GET_TYPES, FILTER_BY_TYPES,ORDER_BY_ATTACK,ORDER_BY_ALPHABET,FILTER_CREATED,CLEAN_STATE} from "../../actions/actionCreator"
const initialState ={
    allPokemons: [],
    filteredPokemons:[],
    pokeDetail:{},
    types:[],
    flagType:false,
    flag1:true,
    filteredCreados:[],
    loading:true,
    allPokemonFiltered:[]

 
}

export default function rootReducer (state = initialState, action){

    switch(action.type){
        case GET_ALL_POKEMONS : 

            return{
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
                loading:false
            }

        case GET_BY_NAME :

            let dataBaseName = []
            let dataApiName=[]
            let regex1 = /[a-zA-Z]/
            if(regex1.test(action.payload[0].id)){
                dataBaseName.push({id:action.payload[0].id,image:action.payload[0].image, name:action.payload[0].name, types:action.payload[0].types.map((g)=>{return g.name})})
            }else{
                if(!regex1.test(action.payload[0].id)){
                    dataApiName = action.payload
                }
            }

            return{
                ...state,
                filteredPokemons:dataApiName.length?dataApiName:dataBaseName,
                flag1: !state.flag1
           
            }

        case GET_BY_ID :
            console.log(action.payload,"id en rootreducer")
            
            return{
                ...state,
                pokeDetail:action.payload[0]
            }

        case GET_TYPES : 

            return{
                ...state,
                types: action.payload
            }

        case FILTER_BY_TYPES : 
            let data1 = []
            
            if(action.payload === "Quitar filtro"){
                return {...state,
                    filteredPokemons:state.allPokemons
                }
            }
            
            if(state.flagType){
  
                const newFilter = state.filteredCreados.filter((p)=>{return p.types.includes(action.payload) })
                return {
                    ...state, 
                    filteredPokemons: newFilter,
                    allPokemonFiltered:newFilter
                }
            }else {
                const newFilter = state.allPokemons.filter((p)=>{return p.types.includes(action.payload) })
                return {
                    ...state, 
                    filteredPokemons: newFilter,
                    allPokemonFiltered:newFilter
                  

                }
            }
   

        case FILTER_CREATED:
            let data4=[]
            let dataFiltered = state.filteredPokemons.length?state.allPokemons:state.allPokemons
            let preData =dataFiltered.filter(c=>{
                let regex = /[a-zA-Z]/
                if(regex.test(c.id)){return c}
            })
              
            let preFilter = dataFiltered.filter(d=>{
                let regex2 = /[a-zA-Z]/
                if(!regex2.test(d.id)){return d}
            })
           
                if(action.payload === "Originales" && preFilter.length > 0){data4.push(preFilter)}
            
                else if(action.payload === "Todos"){
                    data4.push(state.allPokemons)                
                }
                else if(action.payload === "Creados" && preData.length > 0){data4.push(preData)}
                else if(action.payload === "Quitar filtro"){data4.push(state.allPokemons)}

                else{
                    if(action.payload === "Creados" && preData.length === 0){
                    alert("no hay pokemones creados")
                    data4.push(preFilter)
                    }
                }
            return {
                    ...state,
                    filteredPokemons: data4[0],
                    filteredCreados: data4[0],
                    flagType:true, 


                 
            }

        case ORDER_BY_ATTACK:
            let data2 = []
            let data = state.filteredPokemons.length> 0?state.filteredPokemons:state.allPokemons
            data2 = action.payload === false ? data.sort((a,b)=> (a.attack > b.attack) ? 1 : -1) : data.sort((a,b)=> (a.attack < b.attack) ? 1 : -1)
            
            return {
                ...state,
                filteredPokemons:data2,
                flag1:action.payload
            }

            
            case ORDER_BY_ALPHABET:
                let data3 = []
                let datasec = state.filteredPokemons.length> 0?state.filteredPokemons:state.allPokemons
                data3 = action.payload === false ? datasec.sort((a,b)=> (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) : datasec.sort((a,b)=> (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1)
                
                return {
                    ...state,
                    filteredPokemons:data3,
                    flag1:action.payload
                }
            case CLEAN_STATE:
             
                if(action.payload === "Limpiar busqueda")
                return{
                    ...state,
                    filteredPokemons:state.allPokemons
                }
            case CLEAN_DETAIL:
                return {
                    ...state,
                    pokeDetail:{}
                }
            
            
            default :
            return state
        }
    

}  



