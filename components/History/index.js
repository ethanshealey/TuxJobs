import React, { useState } from 'react'
import { ScrollView, View, Box, Header, Center, Button, Text, Link, Pressable , HStack} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view';
import { getTimeSince } from '../../CustomDate';
import { StyleSheet } from 'react-native'

const History = props => {
    return (
        <>
            <ScrollView isFullWidth>
                <HStack>
                    <Pressable style={styles.filterBtn}><Center flex={1} px={3}><Text>Yes</Text></Center></Pressable>
                    <Pressable style={styles.filterBtn}><Center flex={1} px={3}><Text>No</Text></Center></Pressable>
                </HStack>
            
                <SwipeListView
                    style={styles.joblist}
                    data={props.jobs}
                    isFullWidth
                    renderItem={(job) => (
                        <Box>
                            <Text>{job.item.position}</Text>
                            <Text>{job.item.company}</Text>
                            <Text>{job.item.location}</Text>
                            <Text>{getTimeSince(new Date(job.item.date))}</Text>
                        </Box>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View>
                        </View>
                    )}
                />
            </ScrollView>
        </>
    )   
}

const styles = StyleSheet.create({
    filterBtn: {
        width: '50%',
        alignItems: 'center',
        height: '300%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
    },
    joblist: {
        paddingTop: '12%'
    }
})

export default History


