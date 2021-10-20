import React, { useState, useEffect } from 'react'
import { Box, Center, Button, Text } from 'native-base'

const Dashboard = props => {

    useEffect(() => {
    }, [])
    

    return (
        <Center flex={1} px="3">
            <Text fontSize="xl">Welcome, {props.user.displayName}!</Text>
            <Button onPress={props.logout}>Logout</Button>
        </Center>
    )
}

export default Dashboard
