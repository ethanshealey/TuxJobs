import React, { useState } from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
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

const Login = props => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                props.setUser(userCredentials.user)
            })
            .catch((e) => alert("Error logging in"))
    }

    return (
        <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome to TuxJobs
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}>
              Email 
            </FormControl.Label>
            <Input placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}>
              Password
            </FormControl.Label>
            <Input placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} type="password" />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button onPress={onLogin} mt="2" colorScheme="indigo" _text={{ color: 'white' }}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => props.setShowLogin(false)}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    )
}

export default Login