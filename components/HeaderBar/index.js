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
import { Path, G } from 'react-native-svg'
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'; 

const HeaderBar = props => {

    return (
        <HStack bg="#3FA9CA" alignItems="center" height="10" safeAreaTop shadow={6}>
          <Pressable>
            <Center flex={1} px={3}>
              <Icon viewBox="-2500 -1500 2500 2000" top="-20">
                <G fill="#fff" stroke="#fff" transform="rotate(180)">
                  <Path d="M83 1954 c-6 -17 -4 -70 22 -504 24 -411 26 -386 -43 -596 -52 -162
                    -57 -183 -43 -193 63 -46 758 -529 845 -587 70 -48 118 -74 136 -74 18 0 66
                    26 136 74 120 81 795 551 835 581 l25 19 -59 180 c-68 210 -66 177 -40 611 23
                    387 23 499 1 503 -9 2 -188 -90 -399 -204 l-383 -207 -28 16 c-95 56 -85 54
                    -118 35 -16 -10 -43 -25 -58 -35 l-28 -16 -382 206 c-210 114 -389 207 -397
                    207 -9 0 -18 -7 -22 -16z m1069 -737 c80 -155 148 -288 150 -296 2 -10 -28
                    -29 -91 -57 -52 -24 -101 -50 -109 -58 -11 -11 -18 -47 -23 -123 -6 -106 -7
                    -108 -40 -135 -18 -15 -36 -28 -39 -28 -3 0 -21 13 -39 28 -33 27 -34 29 -40
                    135 -5 76 -12 112 -23 123 -8 8 -57 34 -109 58 -63 28 -93 47 -91 57 5 20 296
                    579 302 579 3 0 71 -127 152 -283z m-391 -450 l57 -26 7 -105 7 -106 59 -51
                    c56 -48 59 -54 59 -96 0 -42 -5 -50 -67 -114 -37 -38 -72 -68 -79 -65 -23 9
                    -339 217 -347 229 -6 8 26 80 88 199 l96 188 32 -14 c18 -8 57 -25 88 -39z
                    m694 -134 c62 -120 94 -192 88 -200 -8 -12 -324 -220 -347 -229 -7 -3 -42 27
                    -79 65 -62 63 -67 73 -67 113 -1 40 3 47 57 95 l58 52 10 106 10 107 85 39
                    c47 21 86 39 87 39 1 0 45 -84 98 -187z m-398 -435 l52 -51 -42 -33 c-53 -42
                    -79 -42 -133 -1 l-43 32 52 53 c28 28 54 52 56 52 3 0 29 -23 58 -52z" fill="#fff" 
                    />
                </G>
              </Icon>
            </Center>
          </Pressable>
        </HStack>
    )
}

export default HeaderBar;