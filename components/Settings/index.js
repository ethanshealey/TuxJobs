import React from 'react'
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    Button,
    View,
    NativeBaseProvider,
  } from "native-base"

const Settings = props => {

    const logout = () => {
        props.logout()
    }

    const data = [
        {
            id: '1',
            text: 'Username: ' + props.username,
        },
        {
            id: '2',
            text: 'Email: ' + props.email,
        },
        {
            id: '3',
            text: 'Jobs swiped: ' + props.swipedJobs,
        },
        {
            id: '4',
            text: 'Logout',
            color: 'red.500',
            onPress: logout
        }
    ]

    return (
        <View>
            <Heading fontSize="xl" height="31" p="2" pb="4" marginTop="7" marginBottom="6" textAlign="center">
                Settings
            </Heading>
            <Box
                height="35"
                shadow={0}
                _light={{ backgroundColor: 'white' }}
                _dark={{ backgroundColor: 'gray.700' }}
                style={{borderRadius: 11}}
                alignSelf="center" 
                mt="1"
                mb="1"
                bg="#cccccc"
                width="370"
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">USER SETTINGS</Text>
            </Box>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                <Box
                    borderBottomWidth="1"
                    _dark={{
                    borderColor: "gray.600",
                    }}
                    borderColor="coolGray.200"
                    pl="4"
                    pr="5"
                    py="2"

                >
                    <HStack space={3} justifyContent="space-between">
                    <VStack>
                        <Text
                        _dark={{
                            color: "warmGray.50",
                        }}
                        color={item.color ? item.color : "coolGray.800"}
                        bold
                        onPress={item.onPress && item.onPress}
                        >
                        {item.text}
                        </Text>
                    </VStack>
                    </HStack>
                </Box>
                )}
                keyExtractor={(item) => item.id}
            />
            <Box
                overflow="hidden"
                height="35"
                shadow={1}
                _light={{ backgroundColor: 'white' }}
                _dark={{ backgroundColor: 'gray.700' }}
                style={{borderRadius: 11}}
                alignSelf="center" 
                mt="1" 
                bg="#cccccc"
                width="370"
                marginBottom="383"
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">APP SETTINGS</Text>
            </Box>
        </View>
    )
}

export default Settings
