import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Spinner, Center } from 'native-base';
import { auth } from './firebase.js'

import { getGraphQLJobs } from './API/graphQLjobs'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App = () => {

  const [ user, setUser ] = useState(null)
  const [ hasLoaded, setHasLoaded ] = useState(false)

  // persist user state
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setHasLoaded(true)
    })
  }, [user])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const ref = await getGraphQLJobs()
    console.log(ref)
  }

  // logout the currently signed in user
  const logout = () => {
    setUser(null)
    auth.signOut()
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
       { 
          // if the user is null, show the Auth page and wait until the user signs in
          hasLoaded ? 
            user === null ? <Auth setUser={setUser} /> : <Dashboard logout={logout} user={user} /> 
            :
          <Spinner size="lg" />
       }
      </Center>
    </NativeBaseProvider>
  )
}

export default App