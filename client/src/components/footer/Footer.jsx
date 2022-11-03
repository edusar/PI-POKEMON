import { useHistory } from "react-router-dom"
import "./Footer.css"

export default function Footer() {


    return(<footer className="foot-cont">

        <h3>App created by : Jose Eduardo Maldonado Sarmiento</h3>
        <h3>eMail: estudioedusar@hotmail.com</h3> 
        <a href="https://www.linkedin.com/in/jose-eduardo-maldonado-sarmiento/" target="_blank">  <h3>LinkedIn</h3></a>
        <a href="https://github.com/edusar" target="_blank">  <h3>GitHub</h3></a>

    </footer>)

}