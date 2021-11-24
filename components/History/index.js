import React, { useState, useEffect } from 'react'
import { ScrollView, Spinner, Spacer, Icon, IconButton, View, Box, Header, VStack, Center, Button, Text, Link, Pressable , HStack, Select} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view';
import { getTimeSince, getTimeColorValue } from '../../CustomDate';
import { StyleSheet } from 'react-native'
import { AntDesign, Feather, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { db } from '../../firebase'

/**
 * 
 * History
 * 
 * This page displays the user's liked and disliked jobs
 * in a swipe list view. 
 * 
 * The user can filter between liked and disliked by pressing the 
 * 'check' and 'x' buttons.
 * 
 * swiping the job reveals a 'swap' and 'delete' button. Swapping moves
 * the job to the opposite list, i.e liked -> disliked and vice versa. 
 * Delete removes the job from the DB
 * 
 * on press, a modal with the job details is displayed.
 * 
 */

const History = props => {

    const [ allJobs, setAllJobs ] = useState([])
    const [ history, setHistory ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ showLikedJobs, setShowLikedJobs ] = useState(true)

    // onload, get the users saved jobs from the db
    useEffect(() => { 
        setIsLoading(true)
        db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setAllJobs(doc.data().jobs)
            })
        })
        setAllJobs([...allJobs.reverse()])
        setIsLoading(false)
     }, [])


    // when allJobs or showLikedJobs changes, update history
    useEffect(() => {
        showLikedJobs ? setHistory([...allJobs.filter(job => job.liked)]) : setHistory([...allJobs.filter(job => !job.liked)])
    }, [allJobs, showLikedJobs])

    // when currentJobs changes, update the db
    useEffect(() => {
        db.collection('Users').doc(props.id).update({
            jobs: [...props.currentJobs]
        })
    }, [props.currentJobs])

    // handle job deletion
    const deleteRow = async (k) => {
        setAllJobs(allJobs.filter((job) => job.id !== k))
        props.setCurrentJobs(props.currentJobs.filter((job) => job.id !== k))
    }

    // handle job swapping
    const swapResponse = async (k) => {
        setAllJobs(allJobs.map(job => job.id === k ? {...job, liked: !job.liked} : job ))
        props.setCurrentJobs(props.currentJobs.map(job => job.id === k ? {...job, liked: !job.liked} : job ))
    }

    return (
        <>
        { isLoading ? 
        <Center flex={1} px={3}>
            <Spinner size="lg" /> 
        </Center>
        :
        <ScrollView isFullWidth keyboardShouldPersistTaps='handled'>
            <SwipeListView
                disableRightSwipe
                horizontal={false}
                ListEmptyComponent={() => (
                    <Center flex={1} h="10">
                        <Text>You have no { showLikedJobs ? 'liked' : 'disliked' } jobs!</Text>
                    </Center>
                )}
                ListHeaderComponent={() => (
                    <HStack style={styles.filters}>
                        <Pressable onPress={() => setShowLikedJobs(true)} style={styles.filterBtn}><Center flex={1} px={3}><AntDesign name="check" size={60} color={ showLikedJobs ? "green" : "gray"} /></Center></Pressable>
                        <Pressable onPress={() => setShowLikedJobs(false)} style={styles.filterBtn}><Center flex={1} px={3}><Feather name="x" size={60} color={!showLikedJobs ? "red" : "gray"} /></Center></Pressable>
                    </HStack>
                )}
                data={history}
                isFullWidth
                renderItem={(job) => (
                    <Box style={[styles.listitem, job.index % 2 !== 0 && styles.nthItem]}
                        pl="4"
                        pr="5"
                        py="2"
                    > 
                        <Pressable onPress={() => props.openJobModal(job.item)}>
                            <HStack alignItems="center" space={3}>
                                <VStack>
                                    <Text bold isTruncated maxW="250" fontSize="xl">{job.item.position}</Text>
                                    <Text bold isTruncated maxW="250">{job.item.company}</Text>
                                    <Text>{job.item.location}</Text>
                                </VStack>
                                <Spacer />
                                <Text alignSelf="flex-start" style={{ color: getTimeColorValue(new Date(job.item.date)) }}>{getTimeSince(new Date(job.item.date))}</Text>
                            </HStack>
                        </Pressable>
                    </Box>
                )}
                renderHiddenItem={(job, rowMap) => (
                    <HStack flex="1" pl="2">
                        <Pressable
                            w="100"
                            ml="auto"
                            bg="#c0c1c2"
                            onPress={() => swapResponse(job.item.id)}
                            justifyContent="center"
                        >
                            <VStack alignItems="center" space={2}>
                                <Ionicons name="swap-horizontal" size={30} color="white" />
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
                rightOpenValue={-200}
            />
        </ScrollView> 
        
        }
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


