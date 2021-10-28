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
        <Box
          w={{
            base: "100%",
            md: "25%",
          }}    
          top={0}
        >
            <Heading fontSize="xl" p="4" pb="3">
                Settings
            </Heading>
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
            </Box>
    )
}

export default Settings
