import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Spinner, StatusBar } from 'native-base';
import { auth } from './firebase.js'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App = () => {

  const [ user, setUser ] = useState(1)
  const [ hasLoaded, setHasLoaded ] = useState(false)
  

  // persist user state
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setHasLoaded(true)
    })
  }, [user])

  // logout the currently signed in user
  const logout = () => {
    setUser(null)
    auth.signOut()
  }

  return (
    <NativeBaseProvider>
       { 
          // if the user is null, show the Auth page and wait until the user signs in
          hasLoaded ? 
            user === null ? <Auth setUser={setUser} /> : <Dashboard logout={logout} user={user} /> 
            :
          <Spinner size="lg" />
       }
    </NativeBaseProvider>
  )
}

export default App