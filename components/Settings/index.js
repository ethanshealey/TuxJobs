import React, {useState, useEffect} from 'react'
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    Divider,
    HStack,
    VStack,
    Icon,
    IconButton,
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
import { AntDesign } from '@expo/vector-icons';

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
                marginBottom="3"
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">USER SETTINGS</Text>
            </Box>
            <VStack space={2}>
                <Box>
                    <Text>Username: { props.username }</Text>
                </Box>
                <Divider />
                <Box>
                    <Text>Email: { props.email }</Text>
                </Box>
                <Divider />
                <Box>
                    <Text>Jobs Swiped: { props.swipedJobs }</Text>
                </Box>
                <Divider />
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
                marginBottom="3"
                marginTop="3"
            >   
                <Text color="white" textAlign="left" marginTop="1.5" marginLeft="8">APP SETTINGS</Text>
            </Box>
            <VStack space={2}>
                <HStack space={6}>
                    <Text>Allow Swipe Ratio Warning{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => props.setShowRatioWarningModal(true)}/></Text>
                    <Spacer />
                    <Checkbox value = {swipeRatio} onChange={toggleSwipeRatio}/>
                </HStack>
                <Divider />
                <HStack space={6}>
                    <Text>Allow Cat Naps{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => props.setShowCatNapInfoModal(true)}/></Text>
                    <Spacer />
                    <Checkbox value = {catNaps} onChange={toggleCatNaps}/>
                </HStack>
                <Divider />
                <VStack space={6}>
                    <Text>Job Entry Expiration Time{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => props.setShowExpirationInfoModal(true)}/></Text>
                    <Select
                        //onValueChange={(value) => console.log(value)}
                        marginTop="-5"
                        selectedValue={expiration}
                        minWidth="370"
                        minHeight="10"
                        marginBottom="200"
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
