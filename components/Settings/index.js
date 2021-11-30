import React, {useState, useEffect} from 'react'
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

import {db} from "../../firebase" 

const Settings = props => {

    const [ selected, setSelected ] = useState('two')
    const [ swipeRatio, setSwipeRatio ] = useState(false) 
    const [ catNaps, setCatNaps ] = useState(false)
    const [ expiration, setExpiration ] = useState('two')

    const logout = () => {
        props.logout()
    }
    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            ratio_warning: swipeRatio
        })
    },[swipeRatio])

    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            catnap: catNaps
        })
    },[catNaps])

    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            expiration: expiration
        })
    },[expiration])

    const toggleSwipeRatio = () => {
        setSwipeRatio(!swipeRatio)   
    }

    const toggleCatNaps = () => {
        setCatNaps(!catNaps)
    }

    const toggleExpiration = (value) => {
        console.log(value)
        setExpiration(value)
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
                    <Checkbox value = {swipeRatio} onChange={toggleSwipeRatio}/>
                </HStack>
                <HStack space={6}>
                    <Text>Allow Cat Naps</Text>
                    <Spacer />
                    <Checkbox value = {catNaps} onChange={toggleCatNaps}/>
                </HStack>
                <VStack space={6}>
                    <Text>Job Entry Expiration Time</Text>
                    <Select
                        marginTop="-5"
                        selectedValue={expiration}
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
                        <Select.Item label="2 Weeks" value="two" onPress={() => toggleExpiration("two")}/>
                        <Select.Item label="5 Weeks" value="five" onPress={() => toggleExpiration("five")}/>
                        <Select.Item label="10 Weeks" value="ten" onPress={() => toggleExpiration("ten")}/>
                        <Select.Item label="No Time Expiry" value="never" onPress={() => toggleExpiration("never")}/>
                    </Select>
                </VStack>
            </VStack>
        </VStack>
    )

   
}

export default Settings
