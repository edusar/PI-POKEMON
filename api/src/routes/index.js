const {Pokemon,Type, Pokemon_Type}= require('../db')
const axios= require('axios')
const { Router } = require('express');
const router = Router();
const { json } = require('body-parser')
const Sequelize = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




const getAllPokemons= async(req,res)=>{
    const {name} = req.query
    const id = req.body.id


        try{
             
    if(name){
        try{
            const pokeDb = await Pokemon.findAll({
                where: { 
                    name: { [Sequelize.Op.match]: `%${name}%` },
                },include: { model:Type}
            })

           
   
            if(pokeDb.length == 0){
                try{
                const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const response= apiResponse.data
                const pokeArray = []

                pokeArray.push({
                    id:response.id,
                    name:response.name,
                    image:response?.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    types:response?.types.map((t)=> {return t?.type.name})


                })
                console.log(pokeArray,"poke")
                console.log(pokeDb,"pokeDB")
                return res.status(200).json(pokeArray)
            }catch(e){
                
                return res.status(400).json({e})
            }
            }

            return pokeDb ? res.status(200).json(pokeDb) : res.status(400).json(err.message)  
        }
        catch(err){
          
            return res.status(404).json(err.message,)
        }
    }else{

            const dBCall = await Pokemon.findAll({
                include:{model:Type}
            })
            const apiCall = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5`)
            const pokeArray = []
            
            const pokemonsApi = await apiCall.data.results
      
            for (let i = 0; i < pokemonsApi.length; i++) {
              
                const p = pokemonsApi[i]
                const pokemons = await axios.get(p?.url);
                const pokeInfo = await pokemons?.data
                
                pokeArray.push({
                    id:pokeInfo?.id,
                    name:p?.name,
                    types:pokeInfo.types.map((t)=> {return t?.type.name}),
                    image:pokeInfo?.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    attack:pokeInfo?.stats[1].base_stat
                })

                const pokeTypes = pokeInfo.types.map((t)=> {return t?.type.name})

                for (d of pokeTypes) {
                const saveTypes = await Type.findOrCreate({
                    where:{
                        name:d
                    }
                    
                })}
           
            }
            // console.log(dBCall,"poke en all")
            const data2=dBCall.map ((c)=>{
                
                const pokemon = {
                    id:c.dataValues.id,
                    name:c.dataValues.name,
                    types:c.dataValues.types.map((i,d)=>{return i?.name}),
                    attack:c.dataValues.attack,
                    height: c.dataValues.height,
                    weight:c.dataValues.weight,
                    hp:c.dataValues.hp,
                    speed:c.dataValues.speed,
                    defense:c.dataValues.defense,
                    image:c.dataValues.image,
                    

                }
                return pokemon})
            if(pokeArray)return res.status(200).json(pokeArray.concat(...data2))
        }}
        catch(err){
            console.log("Error en ruta principal")
            res.status(400).json(err.message)            
        }
    }


    


    const getIdPokemon= async(req, res)=>{
        const id = req.params.id
        console.log(id,"id")
        const created ="-"
        try{
            if(id.length > 8){
            
            const dBpokemons = await Pokemon.findOne({
                where:{
                    id:id
                },
                include:{
                    model:Type
                }
            })
            
            
            
                const pokemon = [{
                    id:dBpokemons.dataValues.id,
                    name:dBpokemons.dataValues.name,
                    types:dBpokemons.dataValues.types.map((i,d)=>{return i?.name}),
                    attack:dBpokemons.dataValues.attack,
                    height: dBpokemons.dataValues.height,
                    weight:dBpokemons.dataValues.weight,
                    hp:dBpokemons.dataValues.hp,
                    speed:dBpokemons.dataValues.speed,
                    defense:dBpokemons.dataValues.defense,
                    image:dBpokemons.dataValues.image,  
                    createdBy:dBpokemons.dataValues.createdBy        
                    
                }]
                console.log(pokemon,"poke")
                return res.status(200).json(pokemon?pokemon:"no contiene info id db")
            }else{
                    const apiCall = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
                    const detailPoke = await apiCall.data
                    const detail =[]
                
                    detail.push( {
                        id:detailPoke.id,
                        name:detailPoke.name,
                        types:detailPoke.types.map((t)=> {return t?.type.name}),
                        image:detailPoke?.sprites.versions["generation-v"]["black-white"].animated.front_default,
                        attack:detailPoke?.stats[1].base_stat,
                        hp:detailPoke?.stats[0].base_stat,
                        defense:detailPoke?.stats[2].base_stat,
                        speed:detailPoke?.stats[5].base_stat,
                        weight:detailPoke.weight,
                        height:detailPoke.height,
                       
                    })
                    console.log(detail,"poke")
                    return res.status(200).json(detail)
                }   
        }catch(err){
        
          
            return res.status(400).json(err.message)
        }
    }


    const getTypes = async(req, res)=>{

        const allTypes = await Type.findAll()
        if(allTypes.length > 0){
        
        return res.status(200).json(allTypes)
        }else{
            return res.status(400).json("Error en ruta type")
        }
    }

    const savePokemon = async(req,res)=>{
        const { name,image,height,weight,hp,attack,speed,defense,types} = req.body

        try{

        
            const dataDb = await Pokemon.create({

                name: name,
                image: image,
                height: height,
                weight: weight,
                hp: hp,
                attack: attack,
                speed: speed,
                defense:defense,
                
            })

            for (const t of types){
         
                const tipos = await Type.findOne({
                    where:{
                        name:t
                    }
                })
                await dataDb.addType(tipos)
                
               
            }
           
            return res.status(200).json(dataDb)
        }
        catch(err){
                    return res.status(400).json(err.message)
        }

    }



    router.get("/pokemons", getAllPokemons)
    router.get("/types", getTypes)
    router.get("/pokemons/:id", getIdPokemon)
    router.post("/pokemons", savePokemon)
    
    
    
  
    module.exports = router;
            