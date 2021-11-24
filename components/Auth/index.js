import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'

import { KeyboardAvoidingView, Center } from 'native-base' 

/**
 * 
 * Auth
 * 
 * This screen contains the login, reset password, and register pages
 * 
 */

const Auth = props => {

    const [ showLogin, setShowLogin ] = useState(true)

    return (
        <Center flex={1} px="3">
            <KeyboardAvoidingView w="100%">
                { 
                    // toggle between login and register page
                    showLogin ? <Login setUser={props.setUser} setShowLogin={setShowLogin} /> : <Register setUser={props.setUser} setShowLogin={setShowLogin} /> // show the Register page
                }
            </KeyboardAvoidingView>
        </Center>
    )
}

export default Auth
