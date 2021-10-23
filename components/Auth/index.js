import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'

const Auth = props => {

    const [ showLogin, setShowLogin ] = useState(true)

    return (
        <>
            { 
                // toggle between login and register page
                showLogin ? <Login setUser={props.setUser} setShowLogin={setShowLogin} /> : <Register setUser={props.setUser} setShowLogin={setShowLogin} /> // show the Register page
            }
        </>
    )
}

export default Auth
