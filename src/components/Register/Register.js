import React from "react";

const Register = ({onRouteChange}) => {
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
                                   type="text" name="UserName" id="UserName"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password" name="password" id="password"/>
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
                               onClick= {() =>  onRouteChange('home')}
                        />
                    </div>

                </div>
            </main>
        </article>
    )
}

export default Register
