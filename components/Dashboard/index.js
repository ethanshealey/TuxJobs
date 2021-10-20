import React, { useState, useEffect } from 'react'
import { Box, Center, Button, Text } from 'native-base'
import { db } from '../../firebase.js'

const Dashboard = props => {

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')

    useEffect(() => {
        getCurrentUser()
    }, [])
    
    const getCurrentUser = async () => {
        const data = await db.collection('Users').get().then((qs) => {
            qs.forEach((doc) => {
                if(doc.data().uid === props.user.uid) {
                    setUsername(doc.data().username)
                    setEmail(doc.data().email)
                }
            })
        })
    }

    return (
        <Center flex={1} px="3">
            <Text fontSize="xl">Welcome, {username}!</Text>
            <Button onPress={props.logout}>Logout</Button>
        </Center>
    )
}

export default Dashboard
