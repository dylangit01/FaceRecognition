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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    loadUser = (date) => {
        this.setState({
            user: {
                id: date.id,
                name: date.name,
                email: date.email,
                entries: date.entries,
                joined: date.joined
            }
        })
    };

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
        this.setState({box})
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
        // console.log(event.target.value)
    };

    onButtonSubmit = () => {
        // any prop inside of setState method should use this.state.prop
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3001/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                    if (response) {
                        fetch('http://localhost:3001/image', {
                            method: 'put',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                id: this.state.user.id
                            })
                        })
                            .then(response => response.json())
                            // Below count is the response(result) of this fetch, which is equals
                            // to server.js put request result
                            .then(count => {
                                this.setState(Object.assign(this.state.user, {entries: count}))
                                // console.log(this.state.user.entries)
                            }).catch(console.log)
                    }
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
            // if below bracket's content is {isSignedIn: false}, then we only set the
            // isSignedIn to false, but still kept last user's info, in order to clear
            // last user's info, has to be update the whole state
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
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
                        <Rank name={this.state.user.name}
                              entries={this.state.user.entries}
                        />
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
                            <Signin
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}/>
                            :
                            <Register
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
