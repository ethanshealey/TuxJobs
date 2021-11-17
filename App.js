import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Spinner, Center, extendTheme } from 'native-base';
import { auth } from './firebase.js'

import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

//import { useFonts, Bitter_500Medium } from '@expo-google-fonts/bitter'

const Home = () => {

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
    <>
      { 
          // if the user is null, show the Auth page and wait until the user signs in
          hasLoaded ? 
            user === null ? <Auth setUser={setUser} /> : <Dashboard logout={logout} user={user} /> 
            :
            <Center flex={1} px={3}>
              <Spinner size="lg" />
            </Center>
      }
    </>
  )
  
}

const App = () => {

  /*
  let [ fontsLoaded ] = useFonts({
    Bitter_500Medium
  })

  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          fontFamily: 'Bitter_500Medium'
        }
      }
    }
  })*/

  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  )
}

export default App