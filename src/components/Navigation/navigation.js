import React from "react";


const Navigation = ({onRouteChange, isSignedIn}) => {
    // Below be advised that if we want to add if condition here, both if part and else part have to be
    // returned separately:
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer'
                   onClick={() => onRouteChange('signout')}
                >Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* Below signOut functions either will be working for p tag */}
                {/* Again, same as in Signin.js, this onClick function is a call back one*/}
                <p className='f3 link dim black underline pa3 pointer'
                   onClick={() => onRouteChange('signin')}
                    // onClick={onSignin}
                >Sign In</p>
                <p className='f3 link dim black underline pa3 pointer'
                   onClick={() => onRouteChange('register')}
                >Register</p>
            </nav>
        )
    }
};

export default Navigation
