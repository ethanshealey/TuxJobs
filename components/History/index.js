import React, { useState, useEffect } from 'react'
import { ScrollView, Spacer, Icon, IconButton, View, Box, Header, VStack, Center, Button, Text, Link, Pressable , HStack, Select} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view';
import { getTimeSince, getTimeColorValue } from '../../CustomDate';
import { StyleSheet } from 'react-native'
import { AntDesign, Feather, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { db } from '../../firebase'

const History = props => {

    const [ history, setHistory ] = useState([])
    const [ showLikedJobs, setShowLikedJobs ] = useState(true)
    const [ showDislikedJobs, setShowDislikedJobs ] = useState(true)

    useEffect(() => { 
        db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setHistory(doc.data().jobs)
            })
        })
     }, [])

    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            jobs: [...props.currentJobs]
        })
    }, [props.currentJobs])

    const deleteRow = async (k) => {
        setHistory(history.filter((job) => job.id !== k))
        props.setCurrentJobs(props.currentJobs.filter((job) => job.id !== k))
    }

    return (
        <ScrollView isFullWidth>
            <SwipeListView
                ListHeaderComponent={() => (
                    <HStack style={styles.filters}>
                        <Pressable onPress={() => setShowLikedJobs(!showLikedJobs)} style={styles.filterBtn}><Center flex={1} px={3}><AntDesign name="check" size={60} color={ showLikedJobs ? "green" : "gray"} /></Center></Pressable>
                        <Pressable onPress={() => setShowDislikedJobs(!showDislikedJobs)} style={styles.filterBtn}><Center flex={1} px={3}><Feather name="x" size={60} color={showDislikedJobs ? "red" : "gray"} /></Center></Pressable>
                    </HStack>
                )}
                style={styles.joblist}
                data={history}
                isFullWidth
                renderItem={(job, ) => (
                    <Box style={[styles.listitem, job.index % 2 === 0 && styles.nthItem]}
                        pl="4"
                        pr="5"
                        py="2"
                    > 
                        <HStack alignItems="center" space={3}>
                            <VStack>
                                <Text bold isTruncated maxW="300" fontSize="xl">{job.item.position}</Text>
                                <Text bold isTruncated maxW="300">{job.item.company}</Text>
                                <Text>{job.item.location}</Text>
                            </VStack>
                            <Spacer />
                            <Text alignSelf="flex-start" style={{ color: getTimeColorValue(new Date(job.item.date)) }}>{getTimeSince(new Date(job.item.date))}</Text>
                        </HStack>
                    </Box>
                )}
                renderHiddenItem={(job, rowMap) => (
                    <HStack flex="1" pl="2">
                        <Pressable
                            w="100"
                            ml="auto"
                            bg="white"
                            justifyContent="center"
                        >
                            <VStack alignItems="center" space={2}>
                            </VStack>
                        </Pressable>
                        <Pressable
                            w="100"
                            bg="red.500"
                            justifyContent="center"
                            onPress={() => deleteRow(job.item.id)}
                            _pressed={{
                            opacity: 0.5,
                            }}>
                            <VStack alignItems="center" space={2}>
                            <Icon as={<MaterialIcons name="delete" />} color="white" size="md" />
                            </VStack>
                        </Pressable>
                    </HStack>
                )}
                rightOpenValue={-100}
            />
        </ScrollView>
    )   
}

const styles = StyleSheet.create({
    filterBtn: {
        width: '50%',
        alignItems: 'center',
        height: '150%',
        borderBottomWidth: .25,
        borderBottomColor: '#dedede',
        borderRightWidth: .25,
        borderRightColor: '#dedede',
    },
    filters: {
        paddingBottom: '7.5%'
    },
    listitem: {
        backgroundColor: 'white',
    },
    nthItem: {
        backgroundColor: '#f5f5f5'
    }
})

export default History


