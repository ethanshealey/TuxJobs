import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'

import { KeyboardAvoidingView } from 'native-base' 

const Auth = props => {

    const [ showLogin, setShowLogin ] = useState(true)

    return (
        <KeyboardAvoidingView w="100%">
            { 
                // toggle between login and register page
                showLogin ? <Login setUser={props.setUser} setShowLogin={setShowLogin} /> : <Register setUser={props.setUser} setShowLogin={setShowLogin} /> // show the Register page
            }
        </KeyboardAvoidingView>
    )
}

export default Auth
