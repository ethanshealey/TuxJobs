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
  Center,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';
import { auth } from '../../firebase.js'

const ResetPassword = props => {


    return (
      <Center flex={.65} px={3}>
        <Box safeArea p="2" py="8" w="90%" mx="auto">
          <Heading size="lg" fontWeight="600" color="#fff">
            Reset your password
          </Heading>
          <Heading mt="1" color="#fff" fontWeight="medium" size="xs">
            Enter your email to continue
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label
                _text={{
                  color: '#fff',
                  fontSize: 'xs',
                  fontWeight: 500,
                }}>
                Email 
              </FormControl.Label>
              <Input variant="filled" bg="#fff" placeholderTextColor="#3FA9CA" color="#3FA9CA" placeholder="Email" value={props.email} onChangeText={(e) => props.setEmail(e)} />
              <Link
                _text={{ fontSize: 'xs', fontWeight: '500', color: '#fff' }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => props.setShowResetPassword(false)}>
                Back
              </Link>
            </FormControl>
            <Button style={{ borderRadius: 100 }} bg="#fff" onPress={props.resetPassword} mt="2" colorScheme="indigo" _text={{ color: '#3FA9CA' }}>
              Reset Password
            </Button>
          </VStack>
        </Box>
      </Center>
    )
}

export default ResetPassword
