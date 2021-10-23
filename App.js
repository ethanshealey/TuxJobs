import React, { useState, useEffect } from 'react'
import { NativeBaseProvider } from 'native-base';
import { auth } from './firebase.js'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App = () => {

  const [ user, setUser ] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
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
          user === null ? <Auth setUser={setUser} /> : <Dashboard logout={logout} user={user} /> 
       }
    </NativeBaseProvider>
  )
}

export default App