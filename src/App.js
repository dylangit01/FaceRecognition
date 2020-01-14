import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import 'tachyons'
import Particles from "react-particles-js";

const particlesOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm/>

                {/*<FaceRecognition />*/}
            </div>
        );
    }
}

export default App;
