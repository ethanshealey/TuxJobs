import React, { useEffect } from 'react'
import { Box, Header, Center, Button, Text, Link, Spinner } from 'native-base'
import { StyleSheet } from 'react-native'

const HistoryListItem = props => {

    useEffect(() => { console.log(props.job.position) }, [])

    return (
        <Box style={styles.content}>
           {props.job.position}
           {props.job.company}
        </Box>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'flex-start',
        borderBottomColor: 'gray'
    },
})

export default HistoryListItem
