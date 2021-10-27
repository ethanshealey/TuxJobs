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
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'; 

const HeaderBar = props => {

    return (
        <HStack bg="indigo.600" alignItems="center" height="10" safeAreaTop shadow={6}>
          <Pressable>
            <Center>
              <Icon
                mb="0"
                style={{ top: -25 }}
                as={<FontAwesome5 name="cat" size={24} color="black" />}
                color="white"
                size="sm"
              />
            </Center>
          </Pressable>
        </HStack>
    )
}

export default HeaderBar;