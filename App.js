import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Text, Box, Center } from 'native-base';
import firebase, { auth } from './firebase.js'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App = () => {

  const [ user, setUser ] = useState(null)

  const logout = () => {
    setUser(null)
    auth.signOut()
  }

  return (
    <NativeBaseProvider>
       { user === null ? <Auth setUser={setUser} /> : <Dashboard logout={logout} user={user} /> }
    </NativeBaseProvider>
  )
}

export default App