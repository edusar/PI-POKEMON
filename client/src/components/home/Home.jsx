import "./Home.css"
import NavBar from "../navBar/NavBar"
import Cards from "../cards/Cards"
import titulo from "../imagenes/pokemonstorage.png"
import Footer from "../footer/Footer"

export default function Home () {
    
    return(
        <div className="home-page">
            <NavBar />
            <div className="titulo-home"><img src={titulo}/></div>
            
            <Cards className="cardsinhome"/>
            <Footer className="footer"/>
        </div>
    )

}