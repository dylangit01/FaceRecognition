import React, {Component} from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }


    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    onSubmitRegister =() => {
        console.log(this.state)
        fetch('http://localhost:3001/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => response.json())
            .then(user => {
                // below if no id, the backend "json('incorrect form submission')" will be the user,
                // it will still go to the onRouteChange('home')
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        // below onRouteChange is for last sign in section
        const { onRouteChange } = this.props
        return (
            <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                {/*// notice below input tags have to be added the "/" at the end since JSX is little different with HTML*/}
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="UserName">UserName</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="UserName" id="UserName"
                                        onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"
                                        onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"
                                        onChange={this.onPasswordChange}
                                />
                            </div>
                            {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>*/}
                        </fieldset>
                        <div className="">

                            {/* Okay, below onClick using a call back function to render the "click"
                        event, as per onRouteChange function has a param in App.js,
                        so whenever this event has been clicked, the route will change to 'home'
                    */}
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Register"
                                   onClick= {this.onSubmitRegister}
                            />
                        </div>

                        <div className="lh-copy mt3">
                            <p  className="f6 link dim black db pointer"
                                onClick={() => onRouteChange('signin')}
                            >Sign In</p>
                            {/*<a href="#0" className="f6 link dim black db">Forgot your password?</a>*/}
                        </div>

                    </div>
                </main>
            </article>
        )
    }


}

export default Register
