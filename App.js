import React, { useState } from 'react'
import { NativeBaseProvider } from 'native-base';
import { auth } from './firebase.js'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App = () => {

  const [ user, setUser ] = useState(null)

  // logout the currently signed in user
  const logout = () => {
    setUser(null)
    auth.signOut()
  }

  return (
    <NativeBaseProvider>
       { user === null ? 
        <Auth setUser={setUser} /> // if the user is not signed in, show Auth page
          : 
        <Dashboard logout={logout} user={user} /> // if the user has signed in, show Dashboard
       }
    </NativeBaseProvider>
  )
}

export default App