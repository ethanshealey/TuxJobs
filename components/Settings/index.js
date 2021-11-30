import React, {useState} from 'react'
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
    Select,
    CheckIcon,
    Checkbox,
    NativeBaseProvider,
  } from "native-base"

const Settings = props => {

    const [ selected, setSelected ] = useState('two')

    const logout = () => {
        props.logout()
    }

    return (
        <VStack space={1}>
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
            <VStack space={3}>
                <Box>
                    <Text>Username: { props.username }</Text>
                </Box>
                <Box>
                    <Text>Email: { props.email }</Text>
                </Box>
                <Box>
                    <Text>Jobs Swiped: { props.swipedJobs }</Text>
                </Box>
                <Box>
                    <Text style={{ color: "red" }} onPress={logout}>Logout</Text>
                </Box>
            </VStack>
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
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">APP SETTINGS</Text>
            </Box>
            <VStack space={3}>
                <HStack space={6}>
                    <Text>Allow Swipe Ratio Warning</Text>
                    <Spacer />
                    <Checkbox />
                </HStack>
                <HStack space={6}>
                    <Text>Allow Cat Naps</Text>
                    <Spacer />
                    <Checkbox />
                </HStack>
                <VStack space={6}>
                    <Text>Job Entry Expiration Time</Text>
                    <Select
                        marginTop="-5"
                        selectedValue={selected}
                        minWidth="370"
                        minHeight="10"
                        marginBottom="318"
                        accessibilityLabel="Check Job Expiry Date"
                        placeholder="Check Job Expiry Date"
                        _selectedItem={{
                        endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) => setSelected(itemValue)}
                    >
                        <Select.Item label="2 Weeks" value="two" />
                        <Select.Item label="5 Weeks" value="five" />
                        <Select.Item label="10 Weeks" value="ten" />
                        <Select.Item label="No Time Expiry" value="never" />
                    </Select>
                </VStack>
            </VStack>
        </VStack>
    )

    /*

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

    let [service, setService] = React.useState("")

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
                marginBottom="5"
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">APP SETTINGS</Text>
            </Box>
            <HStack>
                <Center flex={1} px="3">
                    <VStack alignItems="center" space={4}>
                        <Select
                            selectedValue={service}
                            minWidth="370"
                            minHeight="10"
                            marginBottom="318"
                            accessibilityLabel="Check Job Expiry Date"
                            placeholder="Check Job Expiry Date"
                            _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setService(itemValue)}
                        >
                        <Select.Item label="2 Weeks" value="two" />
                        <Select.Item label="5 Weeks" value="five" />
                        <Select.Item label="10 Weeks" value="ten" />
                        <Select.Item label="No Time Expiry" value="never" />
                        </Select>
                    </VStack>  
                </Center>
            </HStack>
        </View>
    )*/
}

export default Settings
