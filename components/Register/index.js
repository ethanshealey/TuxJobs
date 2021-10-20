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
import { auth, db } from '../../firebase.js' 

const Register = props => {

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const onRegister = () => {
        if(username && password === confirmPassword) {
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                userCredentials.user.updateProfile({ displayName: username })
                props.setUser(userCredentials.user)
                const userRef = db.collection('Users').add({
                    uid: userCredentials.user.uid,
                    username: username,
                    email: email,
                    saved_jobs: [],
                })
            })
            .catch(e => alert(e.message))
        }
        else {
            alert("Password do not match")
        }
    }

    return (
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
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
    );
}

export default Register