import React, { useState } from 'react'
import {
  Box,
  Text,
  View,
  Heading,
  VStack,
  FormControl,
  Input,
  Center,
  Link,
  Button,
  HStack,
  Toast
} from 'native-base';
import { auth, db } from '../../firebase.js' 
import { ImageBackground } from 'react-native';

/**
 * 
 * Register
 * 
 * This page allows the user to sign up for TuxJobs
 * with an email, username, and password
 * 
 */

const Register = props => {

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    // on register request
    const onRegister = () => {
        // if the input is valid continue
        if(username && password === confirmPassword) {
            // use auth object to create a new user 
            // on firebase
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                // update the new users displayName
                userCredentials.user.updateProfile({ displayName: username })
                // set the user hook to the new user
                props.setUser(userCredentials.user)
                // add a new user to the db
                const userRef = db.collection('Users').add({
                    uid: userCredentials.user.uid,
                    username: username,
                    email: email,
                    jobs: [],
                })

                Toast.show({ title: `Welcome to TuxJobs, ${username}!`, duration: 3000, status: 'success', placement: 'top' })
            })
            .catch(e => alert(e.message))
        }
        else {
            alert("Password do not match")
        }
    }

    return (
        <View>
        <ImageBackground source={require('../../assets/signupbg.png')} style={{width: '105%', height: '100%', left: '-5%'}}>
          <Center flex={3} px={3} style={{ top: 45 }}>
            <Box safeArea p="2" py="8" w="90%" mx="auto">
            <Heading size="lg" color="#fff" fontWeight="600">
            Welcome to TuxJobs
            </Heading>
            <Heading mt="1" color="#fff" fontWeight="medium" size="xs">
            Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
            <FormControl>
            <FormControl.Label
                _text={{ color: '#fff', fontSize: 'xs', fontWeight: 500 }}>
                Username
                </FormControl.Label>
                <Input color="#0d264d" placeholderTextColor="#AEAEB2" bg="#fff" variant="filled" placeholder="Username" value={username} onChangeText={(e) => setUsername(e)} />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: '#fff', fontSize: 'xs', fontWeight: 500 }}>
                Email
                </FormControl.Label>
                <Input color="#0d264d" placeholderTextColor="#AEAEB2" bg="#fff" variant="filled" placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: '#fff', fontSize: 'xs', fontWeight: 500 }}>
                Password
                </FormControl.Label>
                <Input color="#0d264d" placeholderTextColor="#AEAEB2" bg="#fff" variant="filled" placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} type="password" />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: '#fff', fontSize: 'xs', fontWeight: 500 }}>
                Confirm Password
                </FormControl.Label>
                <Input color="#0d264d" placeholderTextColor="#AEAEB2" bg="#fff" variant="filled" placeholder="Confirm Password" value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} type="password" />
            </FormControl>
            <Button style={{ borderRadius: 100, marginTop: 20 }} bg="#0d264d" onPress={onRegister} mt="2" _text={{ color: '#ffffff' }}>
                Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="#fff" fontWeight={400}>
                I'm already a user.{' '}
                </Text>
                <Link
                _text={{
                    color: '#fff',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                }}
                onPress={() => props.setShowLogin(true)}>
                Login
                </Link>
            </HStack>
            </VStack>
            </Box>
          </Center>
        </ImageBackground>
    </View>
    );

    /*
    return (
        <Box safeArea p="0" w="100%" mx="auto">
            <Heading size="lg" color="coolGray.800" fontWeight="600">
            Welcome to TuxJobs
            </Heading>
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
            <FormControl>
            <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Username
                </FormControl.Label>
                <Input placeholder="Username" value={username} onChangeText={(e) => setUsername(e)} />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Email
                </FormControl.Label>
                <Input placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Password
                </FormControl.Label>
                <Input placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} type="password" />
            </FormControl>
            <FormControl>
                <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Confirm Password
                </FormControl.Label>
                <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} type="password" />
            </FormControl>
            <Button onPress={onRegister} mt="2" colorScheme="indigo" _text={{ color: 'white' }}>
                Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="muted.700" fontWeight={400}>
                I'm already a user.{' '}
                </Text>
                <Link
                _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                }}
                onPress={() => props.setShowLogin(true)}>
                Login
                </Link>
            </HStack>
            </VStack>
        </Box>
    );*/
}

export default Register