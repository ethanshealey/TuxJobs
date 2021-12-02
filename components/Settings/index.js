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
import { AntDesign, FontAwesome, Zocial, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from "../../firebase" 

const Settings = props => {

    const [ selected, setSelected ] = useState('two')

    const logout = () => {
        props.logout()
    }

    const resetPassword = () => {
        auth
            .sendPasswordResetEmail(props.email)
            .then(() => alert('Password reset email sent'))
            .catch((e) => alert(e))
    }

    /*
    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            ratio_warning: props.jobRatio
        })
    },[props.jobRatio])

    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            catnap: props.catnap
        })
    },[props.catnap])

    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            expiration: props.expiration
        })
    },[props.expiration])*/

    const toggleSwipeRatio = () => {
        props.setJobRatio(!props.jobRatio)   
    }

    const toggleCatNaps = () => {
        props.setCatNap(!props.catnap)
    }

    const toggleExpiration = (value) => {
        props.setExpiration(value)
    }

    const handleInfoModalToggle = (m) => {
        switch(m) {
            case 'ratio':
                props.setSettingsInfoModalHeader('Swipe Ratio Warning Information')
                props.setSettingsInfoModalBody('The Swipe Ratio Warning option provides the user with a popup warning indicating the user has a recent swipe ratio of 80/20 disliked to liked ratio.')
                break
            case 'catnap':
                props.setSettingsInfoModalHeader('Cat Nap Information')
                props.setSettingsInfoModalBody('We will send a popup reminder every 60 minutes of swiping to take a mental health break!')
                break
            case 'exp':
                props.setSettingsInfoModalHeader('Job Entry Expiration Information')
                props.setSettingsInfoModalBody('The jobs you have swiped on will automatically be removed after the chosen time.')
                break
            default:
                props.setSettingsInfoModalHeader('Error')
                props.setSettingsInfoModalBody('There was an error loading this information')
                break
        }
        props.setShowInfoModal(true)
    }

    return (
        <VStack space={1}>
            <Heading fontSize="xl" p="2" pb="4" marginTop="10" marginBottom="0" textAlign="center">
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
                    <Text><FontAwesome name="user" size={15} color="black" />{'   '}Username: { props.username }</Text>
                </Box>
                <Divider />
                <Box>
                    <Text><Zocial name="email" size={15} color="black" />{'   '}Email: { props.email }</Text>
                </Box>
                <Divider />
                <Box>
                    <Text><MaterialIcons name="swipe" size={15} color="black" />{'   '}Jobs Swiped: { props.swipedJobs }</Text>
                </Box>
                <Divider />
                <Box>
                    <Text style={{ color: "#3E76C9" }} onPress={resetPassword}><MaterialCommunityIcons name="lock-reset" size={15} color="black" />{'   '}Reset Password</Text>
                </Box>
                <Divider />
                <Box>
                    <Text style={{ color: "red" }} onPress={logout}><AntDesign name="logout" size={15} color="black" />{'   '}Logout</Text>
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
                    <Text>Allow Swipe Ratio Warning{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => handleInfoModalToggle('ratio')}/></Text>
                    <Spacer />
                    <Checkbox aria-label="Toggle Swipe Ratio Warning" isChecked={props.jobRatio} onChange={toggleSwipeRatio} _checked={{ backgroundColor: '#3E76C9', borderColor: '#3E76C9' }}/>
                </HStack>
                <Divider />
                <HStack space={6}>
                    <Text>Allow Cat Naps{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => handleInfoModalToggle('catnap')}/></Text>
                    <Spacer />
                    <Checkbox aria-label="Toggle Cat Naps" isChecked={props.catnap} onChange={toggleCatNaps} _checked={{ backgroundColor: '#3E76C9', borderColor: '#3E76C9' }}/>
                </HStack>
                <Divider />
                <VStack space={6}>
                    <Text>Job Entry Expiration Time{'   '}<AntDesign name="infocirlceo" size={15} color="black" onPress={() => handleInfoModalToggle('exp')}/></Text>
                    <Select
                        aria-label="Job Entry Expiration Time Select"
                        marginTop="-5"
                        selectedValue={props.expiration}
                        minWidth="370"
                        minHeight="10"
                        marginBottom="200"
                        accessibilityLabel="Check Job Expiry Date"
                        placeholder="Check Job Expiry Date"
                        _selectedItem={{
                        endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
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
