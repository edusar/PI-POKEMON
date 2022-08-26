import "./Home.css"
import NavBar from "../navBar/NavBar"
import Cards from "../cards/Cards"
import titulo from "../imagenes/pokemonstorage.png"

export default function Home () {
    
    return(
        <div className="home-page">
            <NavBar />
            <div className="titulo-home"><img src={titulo}/></div>
            
            <Cards className="cardsinhome"/>
        </div>
    )

}