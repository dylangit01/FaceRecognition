import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import 'tachyons'
import Particles from "react-particles-js";
import Clarifai from 'clarifai'

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

const app = new Clarifai.App({
    apiKey: '50a6748fbba24e288be4a0caffae62f6'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputImage');
        const width = +(image.width);
        const height = +(image.height);
        console.log(width, height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
        console.log(box)
        this.setState({box: box})

    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
        console.log(event.target.value)
    };

    onButtonSubmit = () => {
        // any prop inside of setState method should use this.state.prop
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL,
            //if below changes to : this.state.imageUrl will be an error
            this.state.input)
            .then((response) => {
                    // do something with response
                    // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
                    this.displayFaceBox(this.calculateFaceLocation(response))
                }
            ).catch(err => console.log('error here', err));
    };

    // Below function connects with Signin.js input prop, so once this is clicked,
    // the route is changed, so the showing components will be changed.
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true}
            )
        }
        this.setState({route: route})
    };

    // This function is for another signOut function
    // onSignin = () => {
    //     this.setState({route: 'signin'})
    // }

    render() {
        // using const destructuring = this.state to avoid dry:
        const {imageUrl, route, box, isSignedIn} = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}
                />
                {/* Since this is not a HTML syntax, we cannot using if function,
                so here using binary operator and "{}" to wrap all binary operator codes.
                 and if this.state.route === "signin" is true
                 (the state hard code this is true, if else would be false, and other parts will be showing),
                 then only shows <Signin/>, and rest JSX parts have to be wrapped in a div as well;

                  Okay, when we adding the Register component, we need to change below to 'home'*/}

                {route === 'home'
                    ?
                    <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition
                            box={box}
                            imageUrl={imageUrl}
                        />
                    </div>
                    : (
                        route === 'signin'
                            ?
                            <Signin onRouteChange={this.onRouteChange}/>
                            :
                            <Register onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
