import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native';
import {
    NativeBaseProvider,
    Box,
    Text,
    Pressable,
    Heading,
    IconButton,
    Icon,
    HStack,
    Avatar,
    VStack,
    Spacer,
  } from 'native-base';
  import { SwipeListView } from 'react-native-swipe-list-view';
  import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

const History = props => {
    return (
        <>
            { props.jobs.map(job => (
                <View key={job.id}>
                    <Text>{job.position}</Text>
                </View>
            ))}
        </>
    )
}

export default History
