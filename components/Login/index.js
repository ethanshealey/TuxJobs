import React, { useState } from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  View,
  Pressable,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';
import { auth } from '../../firebase.js'
import ResetPassword from '../ResetPassword';
import { ImageBackground } from 'react-native';

const Login = props => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ showResetPassword, setShowResetPassword ] = useState(false)

    // on login request
    const onLogin = () => {
        // use the auth object to request sign in from firebase
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                // if successful set the user hook to 
                // the signed in
                props.setUser(userCredentials.user)
            })
            .catch((e) => alert(e))
    }

    // reset password
    const resetPassword = () => {
        auth
            .sendPasswordResetEmail(email)
            .then(() => alert('Password reset email sent'))
            .catch((e) => alert(e))
    }

    return (
      <View>
        <ImageBackground source={require('../../assets/loginbg.png')} style={{width: '105%', height: '100%', left: '-5%'}}>
        { !showResetPassword ? 
          <Center flex={.65} px={3}>
            <Box safeArea p="2" py="8" w="90%" mx="auto">
              <Heading size="lg" fontWeight="600" color="#fff">
                Welcome to TuxJobs
              </Heading>
              <Heading mt="1" color="#fff" fontWeight="medium" size="xs">
                Sign in to continue!
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label
                    _text={{
                      color: '#fff',
                      fontSize: 'xs',
                      fontWeight: 300,
                    }}>
                    Email 
                  </FormControl.Label>
                  <Input variant="filled" bg="#fff" placeholder="Email" placeholderTextColor="#AEAEB2" color="#0d264d" value={email} onChangeText={(e) => setEmail(e)} />
                </FormControl>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      color: '#fff',
                      fontSize: 'xs',
                      fontWeight: 300,
                    }}>
                      Password
                  </FormControl.Label>
                  <Input variant="filled" bg="#fff" placeholder="Password" placeholderTextColor="#AEAEB2" color="#0d264d" value={password} onChangeText={(e) => setPassword(e)} type="password" />
                  <Link
                    _text={{ fontSize: 'xs', fontWeight: '500', color: '#fff' }}
                    alignSelf="flex-end"
                    mt="1"
                    onPress={() => setShowResetPassword(true)}>
                    Forgot Password?
                  </Link>
                </FormControl>
                <Button style={{borderRadius: 100}} onPress={onLogin} mt="2" bg="#0d264d" _text={{ color: '#ffffff'}}>
                  Sign In
                </Button>
                <HStack mt="2" justifyContent="center">
                  <Text fontSize="sm" color="#fff" fontWeight={400}>
                    I'm a new user.{' '}
                  </Text>
                  <Link
                    _text={{
                      color: '#fff',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => props.setShowLogin(false)}>
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        :
        <ResetPassword resetPassword={resetPassword} email={email} setEmail={setEmail} setShowResetPassword={setShowResetPassword} />
        }
        </ImageBackground>
    </View>
    )
}

export default Login
