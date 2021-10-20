import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'

const Auth = props => {

    const [ showLogin, setShowLogin ] = useState(true)

    return (
        <>
            { showLogin ? 
                <Login setUser={props.setUser} setShowLogin={setShowLogin} /> // show the Login page
                : 
                <Register setUser={props.setUser} setShowLogin={setShowLogin} /> // show the Register page
            }
        </>
    )
}

export default Auth
