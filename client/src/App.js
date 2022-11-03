import './App.css';
import {BrowserRouter as Routes, Route} from "react-router-dom"
import Home from "./components/home/Home"
import CardDetail from "./components/cardDetail/CardDetail"
import Form from "./components/form/Form"
import LandingPage from "./components/landingPage copy/LandingPage"

function App() {
  return (
    <Routes >
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/cardDetail/:id" component={CardDetail}/>
      <Route exact path="/home/Form" component={Form}/>
    
    </Routes>
  );
}

export default App;
