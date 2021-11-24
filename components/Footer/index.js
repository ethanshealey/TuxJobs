import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    HStack,
    Center,
    Pressable,
  } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons'; 

/**
 * 
 * Footer
 * 
 * This screen is the footer of the app.
 * It contains the basic navigation of the Dashboard.
 * 
 */

const Footer = props => {

    return (
        <HStack bg="#3E76C9" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            opacity={props.selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => props.setSelected(0)}>
            <Center>
              <Icon
                mb="1"
                as={
                  <AntDesign name='clockcircleo'/>
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                History
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={props.selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => props.setSelected(1)}
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialIcons name='home' />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={props.selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => props.setSelected(2)}
          >
            <Center>
              <Icon
                mb={1}
                as={<Entypo name="cog" size={24} color="black" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize={12}>
                Settings
              </Text>
            </Center>
          </Pressable>
        </HStack>
    )
}

export default Footer;