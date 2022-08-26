import "./LandingPage.css"
import titulo from "../imagenes/pokemonstorage.png"
export default function LandingPage() {


    const onClick = () => {
        window.location.assign("/home")
    }

    return (

        <div className="container">
            <br />
            <p className="text-cont">
            <h1><div><img src={titulo}/></div></h1>
                La pagina que te brinda una busqueda completa de todos los pokemons.
                <br />Esta pagina tambien cuenta con un elemento de creacion de pokemon para que puedas <br />incluirlos en la base de datos.
                Es practico, rapido y sencillo.
            </p>

            <h5>Haz click en siguente para continuar</h5>
            <button className="btn-lp"onClick={() => { onClick() }}>
               SIGUIENTE
            </button>

        </div>

    )
}