import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'

const Auth = props => {

    const [ showLogin, setShowLogin ] = useState(true)

    return (
        <>
            { showLogin ? <Login setUser={props.setUser} setShowLogin={setShowLogin} /> : <Register setUser={props.setUser} setShowLogin={setShowLogin} /> }
        </>
    )
}

export default Auth
