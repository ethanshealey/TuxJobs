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

const ResetPassword = props => {


    return (
        <Box safeArea p="2" py="8" w="90%" mx="auto">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Reset your password
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            Enter your email to continue
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
              <Input placeholder="Email" value={props.email} onChangeText={(e) => props.setEmail(e)} />
              <Link
                _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => props.setShowResetPassword(false)}>
                Back
              </Link>
            </FormControl>
            <Button onPress={props.resetPassword} mt="2" colorScheme="indigo" _text={{ color: 'white' }}>
              Reset Password
            </Button>
          </VStack>
        </Box>
    )
}

export default ResetPassword
