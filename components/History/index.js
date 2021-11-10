import React, { useState, useEffect } from 'react'
import { ScrollView, Icon, IconButton, View, Box, Header, VStack, Center, Button, Text, Link, Pressable , HStack, Select} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view';
import { getTimeSince } from '../../CustomDate';
import { StyleSheet } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

const History = props => {

    const [ history, setHistory ] = useState([...props.jobs])
    const [ showLikedJobs, setShowLikedJobs ] = useState(true)
    const [ showDislikedJobs, setShowDislikedJobs ] = useState(true)

    useEffect(() => {
        if(showLikedJobs && showDislikedJobs) {
            setHistory([...props.jobs])
        } 
        else if(showLikedJobs && !showDislikedJobs) {
            setHistory([...props.jobs.filter(job => job.liked)])
        }
        else if(!showLikedJobs && showDislikedJobs) {
            setHistory([...props.jobs.filter(job => !job.liked)])
        }
        else if(!showLikedJobs && !showDislikedJobs) {
            setHistory([...props.jobs])
            setShowDislikedJobs(true)
        }
    }, [showLikedJobs])

    useEffect(() => {
        if(showLikedJobs && showDislikedJobs) {
            setHistory([...props.jobs])
        } 
        else if(showLikedJobs && !showDislikedJobs) {
            setHistory([...props.jobs.filter(job => job.liked)])
        }
        else if(!showLikedJobs && showDislikedJobs) {
            setHistory([...props.jobs.filter(job => !job.liked)])
        }
        else if(!showLikedJobs && !showDislikedJobs) {
            setHistory([...props.jobs])
            setShowLikedJobs(true)
        }
    }, [showDislikedJobs])

    return (
        <>
            <ScrollView isFullWidth>
                <HStack>
                    <Pressable onPress={() => setShowLikedJobs(!showLikedJobs)} style={styles.filterBtn}><Center flex={1} px={3}><AntDesign name="check" size={60} color={ showLikedJobs ? "green" : "gray"} /></Center></Pressable>
                    <Pressable onPress={() => setShowDislikedJobs(!showDislikedJobs)} style={styles.filterBtn}><Center flex={1} px={3}><Feather name="x" size={60} color={showDislikedJobs ? "red" : "gray"} /></Center></Pressable>
                </HStack>
            
                <SwipeListView
                    style={styles.joblist}
                    data={history}
                    isFullWidth
                    renderItem={(job) => (
                        <Box style={[styles.listitem, job.index % 2 === 0 && styles.nthItem]}
                            pl="4"
                            pr="5"
                            py="2"
                        > 
                            <Text>{job.item.position}</Text>
                            <Text>{job.item.company}</Text>
                            <Text>{job.item.location}</Text>
                            <Text>{getTimeSince(new Date(job.item.date))}</Text>
                        </Box>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <HStack flex="1" pl="2">
                        <Pressable
                            w="100"
                            ml="auto"
                            bg="coolGray.200"
                            justifyContent="center"
                            onPress={() => closeRow(rowMap, data.item.key)}
                            _pressed={{
                            opacity: 0.5,
                            }}>
                            <VStack alignItems="center" space={2}>
                            <Icon
                                as={<Entypo name="dots-three-horizontal" />}
                                size="xs"
                                color="coolGray.800"
                            />
                            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                                More
                            </Text>
                            </VStack>
                        </Pressable>
                        <Pressable
                            w="100"
                            bg="red.500"
                            justifyContent="center"
                            onPress={() => deleteRow(rowMap, data.item.key)}
                            _pressed={{
                            opacity: 0.5,
                            }}>
                            <VStack alignItems="center" space={2}>
                            <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                            <Text color="white" fontSize="xs" fontWeight="medium">
                                Delete
                            </Text>
                            </VStack>
                        </Pressable>
                        </HStack>
                    )}
                    rightOpenValue={-200}
                />
            </ScrollView>
        </>
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
    joblist: {
        paddingTop: '7.5%'
    },
    listitem: {
        backgroundColor: 'white',
    },
    nthItem: {
        backgroundColor: '#f5f5f5'
    }
})

export default History


